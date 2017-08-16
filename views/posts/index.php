<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $searchModel app\models\PostsSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Посты';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="posts-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?php
    $model = $dataProvider->getModels();
    for ($i = 0; $i < count($model); $i++){
        echo Html::tag('h3',Html::encode($model[$i]['title']),[]);
        echo Html::tag('div',mb_substr(Html::encode($model[$i]['text']),0, 250) . '...',[]);
        echo Html::a('Смотреть подробнее','/posts/view?id=' . $model[$i]['id'],['class' => 'btn btn-success']);
    }
    ?>
</div>
