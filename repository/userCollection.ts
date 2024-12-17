import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { User, CreateUserDto } from "../entities/user";

export class UserRepository {
  private collection = db.collection("USERS");

  async create(userData: CreateUserDto): Promise<Partial<User>> {
    const user: Partial<User> = {
      name: userData.name,
      email: userData.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await this.collection.add(user);
    auth.createUser({
      email: userData.email,
      password: userData.password,
    });

    return { ...user, id: docRef.id };
  }

  async findAll(): Promise<User[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as User)
    );
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await this.collection
      .where("email", "==", email)
      .limit(1)
      .get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as User;
  }

  async update(id: string, userData: Partial<User>): Promise<Partial<User>> {
    const doc = await this.collection.doc(id).update(userData);

    return userData;
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}

export const userRepository = new UserRepository();
