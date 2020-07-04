import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addAvatarFieldToUsers1593054798241 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.addColumn('users',new TableColumn({
			name: 'avatar',
			type: 'varchar',
			isNullable: true,
			default: null
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropColumn('users','avatar');
    }

}
