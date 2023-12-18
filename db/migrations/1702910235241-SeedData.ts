import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedData1702910235241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'INSERT INTO users (username, password) VALUES ("ali", "alipass");',
    );
    await queryRunner.query(
      'INSERT INTO users (username, password) VALUES ("marton", "martonpass");',
    );

    const data = Array(100)
      .fill(null)
      .map((_, index) => {
        return {
          title: `Task ${index}`,
          description: `Description ${index}`,
          is_completed: Math.random() > 0.5 ? 1 : 0,
          created_by: Math.random() > 0.5 ? 1 : 2,
        };
      });

    for (const task of data) {
      await queryRunner.query(
        'INSERT INTO tasks (title, description, is_completed, created_by) VALUES (?, ?, ?, ?);',
        [task.title, task.description, task.is_completed, task.created_by],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM tasks;');
    await queryRunner.query('DELETE FROM users;');
  }
}
