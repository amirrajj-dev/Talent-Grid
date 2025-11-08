import { Inngest } from 'inngest';
import { connectToDb } from '../db/db.js';
import User from '../models/user.model.js';
import { deleteStreamUser, upsertStreamUser } from './stream.js';
import { sendWelcomeEmail } from './mailer.js';

export const inngest = new Inngest({ id: 'talent-grid' });

export const syncUser = inngest.createFunction(
  {
    id: 'sync-user',
  },
  {
    event: 'clerk/user.created',
  },
  async ({ event }) => {
    await connectToDb();
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ''} ${last_name || ''}`.trim(),
      profileImage: image_url,
    };
    await User.create(newUser);
    await upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.image,
    });
    await sendWelcomeEmail(newUser.email, newUser.name);
  },
);

export const deleteUserFromDB = inngest.createFunction(
  {
    id: 'delete-user-from-db',
  },
  {
    event: 'clerk/user.deleted',
  },
  async ({ event }) => {
    await connectToDb();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
    await deleteStreamUser(id.toString());
  },
);

export const functions = [syncUser, deleteUserFromDB];
