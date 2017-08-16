(function ($) {
    $(function () {
        $('#getComments').on('click', function (e) {
            e.preventDefault();
            $(this).hide();
            getComments($(this).data('id'));
        })
    });

    function getComments(id) {
        $.ajax({
            url: '/comments/post?id=' + id,
            dataType: 'json',
            data: {'id': id},
            success: function (res) {
                parseComments(res)
            },
            error: function (res) {
                console.log(res);
            }
        });
    }

    function parseComments(response) {
        var commentsBlock = $('#comments-block');
        commentsBlock.empty();
        commentsBlock.append(
            $('<form />',{
                'id': 'addCommentForm'
            }).append(
                $('<input />',{
                    'name': 'id_post',
                    'value': $('#getComments').data('id'),
                    'type': 'hidden'
                })
            ).append(
                $('<input />',{
                    'placeholder': 'Имя',
                    'name': 'user_name',
                    'class': 'form-control'
                })
            ).append(
                $('<textarea />',{
                    'placeholder': 'Текст',
                    'name': 'text',
                    'class': 'form-control'
                }).css({'margin-top': "15px"})
            ).append(
                $('<button />',{
                    'text': 'Добавить комментарий',
                    'class': 'btn btn-success'
                }).css({'margin-top': "15px"}).on('click', function (e) {
                    e.preventDefault();
                    var flag = true;
                    if($(this).prev().val() == ''){
                        $(this).prev().css({'border-color':"#f00"});
                        flag = false;
                    }
                    if($(this).prev().prev().val() == ''){
                        $(this).prev().prev().css({'border-color':"#f00"});
                        flag = false;
                    }
                    if(flag){
                        var url = '/comments';
                        var method = 'POST';
                        if($(this).text() == 'Сохранить'){
                            url += '/' + $(this).data('post-id');
                            method = 'PUT';
                        }
                        $.ajax({
                            url: url,
                            method: method,
                            dataType: 'json',
                            data: $('#addCommentForm').serialize(),
                            success: function (res) {
                                getComments($('#getComments').data('id'));
                            },
                            error: function (res) {
                                console.log(res);
                            }
                        })
                    }
                })
            )
        );
        commentsBlock.append(
            $('<h3 />',{
                'text': 'Коментарии'
            })
        );
        for(var i = 0; i < response.length; i++){
            createComment(response[i]);
        }
    }

    function createComment(comment) {
        var commentsBlock = $('#comments-block');
        var commentBlock = $('<div />', {
            'class': 'comment'
        }).append(
            $('<h4 />',{
                'text': comment.user_name
            })
        ).append(
            $('<div />',{
                'text': comment.text
            })
        ).append(
            $('<button />',{
                'text': 'Редактировать',
                'data-id': comment.id,
                'class': 'btn btn-primary'
            }).on('click', function (e) {
                e.preventDefault();
                $('#addCommentForm').find('[name="user_name"]').val($(this).prev().prev().text());
                $('#addCommentForm').find('[name="text"]').val($(this).prev().text());
                $('#addCommentForm').find('.btn-success').text('Сохранить');
                $('#addCommentForm').find('.btn-success').attr('data-post-id', $(this).data('id'));
            })
        ).append(
            $('<button />',{
                'text': 'Удалить',
                'data-id': comment.id,
                'class': 'btn btn-danger'
            }).on('click', function (e) {
                e.preventDefault();
                $.ajax({
                    url: '/comments/' + $(this).data('id'),
                    method: 'DELETE',
                    dataType: 'json',
                    success: function (res) {
                        getComments($('#getComments').data('id'));
                    },
                    error: function (res) {
                        console.log(res);
                    }
                })
            })
        );
        commentsBlock.append(commentBlock);
    }
})(jQuery);