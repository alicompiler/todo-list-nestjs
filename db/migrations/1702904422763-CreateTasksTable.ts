import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasksTable1702904422763 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
          `CREATE TABLE tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            is_completed BOOLEAN NOT NULL DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_by INT NOT NULL,
            FOREIGN KEY (created_by) REFERENCES users(id)
           );`,
      )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
          `DROP TABLE tasks;`,
      )
  }
}
