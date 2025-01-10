import { AppDataSource } from "./data-source";
import { Role } from "./models/Role";
import { Permission } from "./models/Permission";

const seedDatabase = async () => {
  const roleRepository = AppDataSource.getRepository(Role);
  const permissionRepository = AppDataSource.getRepository(Permission);

  // Define permissions
  const permissions = [
    "create_blog",
    "read_blog",
    "update_blog",
    "delete_blog",
  ].map((name) => permissionRepository.create({ name }));

  await permissionRepository.save(permissions);

  // Define roles
  const adminRole = roleRepository.create({
    name: "Admin",
    permissions,
  });

  const editorRole = roleRepository.create({
    name: "Editor",
    permissions: permissions.filter((p) => p.name !== "delete_blog"),
  });

  await roleRepository.save([adminRole, editorRole]);

  console.log("Database seeded with roles and permissions.");
};

AppDataSource.initialize()
  .then(() => seedDatabase())
  .catch((error) => console.error("Error seeding database:", error));
