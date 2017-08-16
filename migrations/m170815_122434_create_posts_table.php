<?php

use yii\db\Migration;

/**
 * Handles the creation of table `posts`.
 */
class m170815_122434_create_posts_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('posts', [
            'id' => $this->primaryKey(),
            'title' => $this->string()->notNull(),
            'text' => $this->text(),
            'status' => $this->boolean()->defaultValue(true),
            'created_at' => $this->timestamp()->notNull(),
            'update_at' => $this->timestamp()->notNull(),
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('posts');
    }
}
