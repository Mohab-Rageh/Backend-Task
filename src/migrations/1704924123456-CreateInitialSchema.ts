import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateInitialSchema1704924123456 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Roles Table
    await queryRunner.createTable(
      new Table({
        name: "role",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
          },
        ],
      }),
      true
    );

    // Create Permissions Table
    await queryRunner.createTable(
      new Table({
        name: "permission",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
          },
        ],
      }),
      true
    );

    // Create Role Permissions Junction Table
    await queryRunner.createTable(
      new Table({
        name: "role_permissions",
        columns: [
          {
            name: "role_id",
            type: "int",
          },
          {
            name: "permission_id",
            type: "int",
          },
        ],
      }),
      true
    );

    // Create Users Table
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "roleId",
            type: "int",
            isNullable: true,
          },
        ],
      }),
      true
    );

    // Create Blogs Table
    await queryRunner.createTable(
      new Table({
        name: "blog",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "content",
            type: "text",
          },
          {
            name: "tags",
            type: "text",
            isNullable: true,
          },
          {
            name: "authorId",
            type: "int",
            isNullable: true,
          },
        ],
      }),
      true
    );

    // Add Foreign Keys
    await queryRunner.createForeignKey(
      "role_permissions",
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "role",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "role_permissions",
      new TableForeignKey({
        columnNames: ["permission_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "permission",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        columnNames: ["roleId"],
        referencedColumnNames: ["id"],
        referencedTableName: "role",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "blog",
      new TableForeignKey({
        columnNames: ["authorId"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order
    await queryRunner.dropTable("blog");
    await queryRunner.dropTable("user");
    await queryRunner.dropTable("role_permissions");
    await queryRunner.dropTable("permission");
    await queryRunner.dropTable("role");
  }
}
