$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = 
        `<div class="message-information" data-message-id=${message.id}>
          <div class="Chat-main__message-list">
            <div class="message-information">
              <div class="message-name">
                ${message.user_name}
              </div>
              <div class="message-date">
                ${message.created_at}
              </div>
            </div>
            <div class="message-text">
              <p class="Message__content">
                ${message.content}
              </p>
              <img class="Message__image" src="${message.image}">
            </div>
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message-information" data-message-id=${message.id}>
        <div class="Chat-main__message-list">
          <div class="message-information">
            <div class="message-name">
              ${message.user_name}
            </div>
            <div class="message-date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-text">
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>
      </div>`
      return html;
    };
  } 

  $('.input-box').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData, 
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Chat-main__message-list').append(html);
      $('input-box')[0].reset();
      $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
      // $('#message_content').val('');
      $('.input-box__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.input-box__submit-btn').prop("disabled",false);
    });
  });
});