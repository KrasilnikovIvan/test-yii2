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
                        console.log($('#addCommentForm').serialize());
                        $.ajax({
                            url: '/comments',
                            method: "POST",
                            dataType: 'json',
                            data: $('#addCommentForm').serialize(),
                            success: function (res) {
                                createComment(res);
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
        );
        commentsBlock.append(commentBlock);
    }
})(jQuery);