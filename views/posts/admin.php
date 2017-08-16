<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\PostsSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Управление постами';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="posts-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a('Создать пост', ['create'], ['class' => 'btn btn-success']) ?>
    </p>
    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],
            [
                'label' => $searchModel->getAttributeLabel('id'),
                'value' => function($data){
                    return $data->id;
                }
            ],
            [
                'label' => $searchModel->getAttributeLabel('update_at'),
                'value' => function($data){
                    return $data->update_at;
                }
            ],
            [
                'label' => $searchModel->getAttributeLabel('status'),
                'value' => function($data){
                    return $data->status ? 'Опубликовано': 'Не опубликовано';
                }
            ],
            [
                'label' => $searchModel->getAttributeLabel('title'),
                'value' => function($data){
                    return $data->title;
                }
            ],

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
</div>
