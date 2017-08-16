<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Posts */

$this->title = $model->title;
$this->params['breadcrumbs'][] = ['label' => 'Posts', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="posts-view">

    <h1><?= Html::encode($this->title) ?></h1>
    <div class="content-body"><?= Html::encode($model->text) ?></div>
    <br>
    <p>
    <?php
    if(!Yii::$app->user->isGuest){
        echo Html::a('Изменить', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']);
        echo Html::a('Удалить', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Вы уверены, что хотите удалить?',
                'method' => 'post',
            ],
        ]);
    }
    ?>
    </p>
    <?= Html::a('Показать коментарии','/comments',['class' => 'btn btn-success', 'data-id' => $model->id, 'id' => 'getComments']) ?>
    <div id="comments-block"></div>

</div>
