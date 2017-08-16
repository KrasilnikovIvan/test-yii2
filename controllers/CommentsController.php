<?php

namespace app\controllers;

use yii\rest\ActiveController;
use yii\data\ActiveDataProvider;
use app\models\Comments;

/**
 * CommentsController implements the CRUD actions for Comments model.
 */
class CommentsController extends ActiveController
{
    public $modelClass = Comments::class;

    public function actionPost($id) {
        return new ActiveDataProvider([
            'query' => Comments::find()->where(['id_post'=>$id]), // and the where() part, etc.
        ]);
    }
}
