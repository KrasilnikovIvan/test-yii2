<?php

use yii\db\Migration;

/**
 * Handles the creation of table `comments`.
 */
class m170815_122605_create_comments_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('comments', [
            'id' => $this->primaryKey(),
            'id_post' => $this->integer()->notNull(),
            'user_name' => $this->string()->notNull(),
            'text' => $this->text(500),
        ]);
        $this->addForeignKey('fk_comments_for_post', 'comments', 'id_post', 'posts', 'id');
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropForeignKey('fk_comments_for_post', 'comments');
        $this->dropTable('comments');
    }
}
