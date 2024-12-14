// 共通処理

// jsファイル呼び出し用関数
function appendScript(URL) {
    var el = document.createElement("script");
    el.src = URL;
    document.body.appendChild(el);
}

// iOSフォーム入力時のズーム削除
let ua = navigator.userAgent.toLowerCase();
let isiOS = ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1;
if (isiOS) {
    let viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        let viewportContent = viewport.getAttribute("content");
        viewport.setAttribute(
            "content",
            viewportContent + ", user-scalable=no"
        );
    }
}

// 画面の高さ取得
$('.container').outerHeight($(window).height());
$(window).on(function(){
winH = $(window).height();
$('.container').outerHeight(winH);
});

function cardSwitch(obj, id) {
    $(function() {
        if ($(obj).prop("checked") == true) {
            $(".card-area").addClass("is-reverse");
            $(".card-area").removeClass("is-surface");
            $(".surface-input").hide();
            $(".reverse-input").show();
        } else {
            $(".card-area").removeClass("is-reverse");
            $(".card-area").addClass("is-surface");
            $(".surface-input").show();
            $(".reverse-input").hide();
        }
    });
}

// プレビュー画面表示切替
$(function() {
    $("#preview").click(function() {
        $(".surface-input").toggleClass("d-none");
        $(".reverse-input").toggleClass("d-none");
        $(".card-switch-a").toggleClass("d-none");
        $("#card-adjust-message").toggleClass("d-none");
        $(".preview-wrap").toggleClass("p-wrapper");
        $(".input-area-wrapper").toggleClass("d-none");
        $("body").toggleClass("preview-mode-bgcolor");
        $("#card-cap-area").toggleClass("preview-mode");
        // $(".card-switch").toggleClass("preview-mode2");
        $(".card-area").toggleClass("card-area-shadow");
        $("header").toggleClass("d-none");
        $("footer").toggleClass("d-none");
        $("body").toggleClass("preview-mode-scroll");

        //ドラッグアンドドロップで要素を移動
        (function() {
            //要素の取得
            var elements = document.getElementsByClassName("drag-and-drop");

            //要素内のクリックされた位置を取得するグローバル（のような）変数
            var x;
            var y;

            //マウスが要素内で押されたとき、又はタッチされたとき発火
            for (var i = 0; i < elements.length; i++) {
                elements[i].addEventListener("mousedown", mdown, false);
                elements[i].addEventListener("touchstart", mdown, false);
            }

            //マウスが押された際の関数
            function mdown(e) {
                //クラス名に .drag を追加
                this.classList.add("drag");

                //タッチデイベントとマウスのイベントの差異を吸収
                if (e.type === "mousedown") {
                    var event = e;
                } else {
                    var event = e.changedTouches[0];
                }

                //要素内の相対座標を取得
                x = event.pageX - this.offsetLeft;
                y = event.pageY - this.offsetTop;

                //ムーブイベントにコールバック
                document.body.addEventListener("mousemove", mmove, false);
                document.body.addEventListener("touchmove", mmove, false);
            }

            //マウスカーソルが動いたときに発火
            function mmove(e) {
                //ドラッグしている要素を取得
                var drag = document.getElementsByClassName("drag")[0];

                //同様にマウスとタッチの差異を吸収
                if (e.type === "mousemove") {
                    var event = e;
                } else {
                    var event = e.changedTouches[0];
                }

                //フリックしたときに画面を動かさないようにデフォルト動作を抑制
                e.preventDefault();

                //マウスが動いた場所に要素を動かす
                drag.style.top = event.pageY - y + "px";
                drag.style.left = event.pageX - x + "px";

                //マウスボタンが離されたとき、またはカーソルが外れたとき発火
                drag.addEventListener("mouseup", mup, false);
                document.body.addEventListener("mouseleave", mup, false);
                drag.addEventListener("touchend", mup, false);
                document.body.addEventListener("touchleave", mup, false);
            }

            //マウスボタンが上がったら発火
            function mup(e) {
                var drag = document.getElementsByClassName("drag")[0];

                //ムーブベントハンドラの消去
                document.body.removeEventListener("mousemove", mmove, false);
                drag.removeEventListener("mouseup", mup, false);
                document.body.removeEventListener("touchmove", mmove, false);
                drag.removeEventListener("touchend", mup, false);

                //クラス名 .drag も消す
                drag.classList.remove("drag");
            }
        })();

        if ($("#preview").html() === "プレビュー") {
            $("#preview").html("プレビュー終了");
        } else {
            $("#preview").html("プレビュー");
        }
    });
});

// シェアボタン
function share() {
    //web share apiをサポートしているか否か
    if (navigator.share) {
        navigator.share({
            title: document.querySelector("title").textContent,
            text: document
                .querySelector('meta[name="description"]')
                .getAttribute("content"),
            url: location.href
        });
    }
    //サポートしていない場合の処理
    else {
        alert("このブラウザはシェア機能に対応していません。");
    }
}

// 文字サイズ切替
function nameSizeChange() {
    $(function() {
        let value = document.getElementById("name_size").value;
        if (value == 1) {
            $(".card-name").css("font-size", "0.8rem");
        } else if (value == 2) {
            $(".card-name").css("font-size", "0.5rem");
        } else {
            $(".card-name").css("font-size", "1rem");
        }
    });
}

// 表面・入力エリアの表示切替
$(function() {
    $('input[name="menu-tab"]').change(function() {
        // value値取得
        let val = $(this).val();
        let menucount = document.getElementsByName("menu-tab").length;
        for (let i = 1; i <= menucount; i++) {
            $("#inputArea" + i).hide();
        }
        $("#inputArea" + val).show();
    });
});

// 裏面・入力エリアの表示切替
$(function() {
    $('input[name="menu-tab2"]').change(function() {
        // value値取得
        let val = $(this).val();
        let menucount = document.getElementsByName("menu-tab2").length;
        for (let i = 1; i <= menucount; i++) {
            $("#reverse_inputArea" + i).hide();
        }
        $("#reverse_inputArea" + val).show();
    });
});

// 表面
// 背景色カラーピッカー
$(function() {
    $("#bg-color-picker").on("change", function() {
        $("#card_surface").css("background-color", $("#bg-color-picker").val());
        $(".typetitle-wrap").css("background-color", $("#bg-color-picker").val());
    });
});

// 有効期限の背景カラーピッカー
$(function() {
    $("#header-color-picker").on("change", function() {
        $(".deadline-frame").css(
            "background-color",
            $("#header-color-picker").val()
        );
    });
});

// 番号・種類の背景カラーピッカー
$(function() {
    $("#number-color-picker").on("change", function() {
        $(".redbg").css(
            "background-color",
            $("#number-color-picker").val()
        );
    });
});

// 写真の背景カラーピッカー
$(function() {
    $("#image-color-picker").on("change", function() {
        $(".croppedCanvas2").css(
            "background-color",
            $("#image-color-picker").val()
        );
    });
});

// 線の色カラーピッカー
$(function() {
    $("#border-color-picker").on("change", function() {
        $(".licenseborder").css(
            "border-color",
            $("#border-color-picker").val()
        );
    });
});

// 全体文字色カラーピッカー
$(function() {
    $("#name-color-picker").on("change", function() {
        $("#card_surface").css("color", $("#name-color-picker").val());
    });
});

// 運転免許証カラーピッカー
$(function() {
    $("#license-color-picker").on("change", function() {
        $(".licensename").css("color", $("#license-color-picker").val());
    });
});

// 委員会・角印カラーピッカー
$(function() {
    $("#kakuin-color-picker").on("change", function() {
        $(".committee").css("color", $("#kakuin-color-picker").val());
        $(".kakuin").css("color", $("#kakuin-color-picker").val());
        $(".kakuin").css("border-color", $("#kakuin-color-picker").val());
    });
});

// 裏面
// 背景カラーピッカー
$(function() {
    $("#reverse-bg-color-picker").on("change", function() {
        $(".card_reverse").css(
            "background-color",
            $("#reverse-bg-color-picker").val()
        );
    });
});

// 主線の色カラーピッカー
$(function() {
    $("#reverse-border-color-picker").on("change", function() {
        $(".reverseborder").css(
            "border-color",
            $("#reverse-border-color-picker").val()
        );
        $(".reverseborder-text").css(
            "color",
            $("#reverse-border-color-picker").val()
        );
    });
});

// 罫線の色カラーピッカー
$(function() {
    $("#reverse-border2-color-picker").on("change", function() {
        $(".reverseborder-line").css(
            "border-color",
            $("#reverse-border2-color-picker").val()
        );
    });
});

// 全体文字色カラーピッカー
$(function() {
    $("#reverse-text-color-picker").on("change", function() {
        $("#card_reverse").css("color", $("#reverse-text-color-picker").val());
    });
});


//エスケープ文字の処理
function escapeSelectorString(val) {
    return val.replace(/[ !"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, "\\$&");
}

// スタンプの表示切替
function checkStamp(obj, id) {
    if (obj.checked) {
        document.getElementById("stamp-input-area").style.display = "block";
        document.getElementById("excellent-frame").style.display = "block";
    } else {
        document.getElementById("stamp-input-area").style.display = "none";
        document.getElementById("excellent-frame").style.display = "none";
    }
}

// 角印の表示切替
function checkKakuin(obj, id) {
    if (obj.checked) {
        document.getElementById("kakuin-input-area").style.display = "block";
        document.getElementById("kakuin-area").style.display = "block";
        // document.getElementById("kakuin-area").classList.add("d-flex");
    } else {
        document.getElementById("kakuin-input-area").style.display = "none";
        document.getElementById("kakuin-area").style.display = "none";
        // document.getElementById("kakuin-area").classList.remove("d-flex");
    }
}

// 半角→全角へ変換
var hanZen = function(e) {
    var v, old = e.value;
    return function(){
        if( old != ( v = e.value ) ){
            old = v;
            var str = $(this).val();
            str = str.replace( /[A-Za-z0-9-!"#$%&'()=<>,.?_\[\]{}@^~\\]/g, function(s) {
                return String.fromCharCode(s.charCodeAt(0) + 65248);
            });
            $(this).val(str);
        }
    }
};
$(function(){
    $(".hanzen").each(function(){
        $(this).bind('keyup', hanZen(this));
    });
});

// 文字数制限
function sliceMaxLength(elem, maxLength) {
    elem.value = elem.value.slice(0, maxLength);
}

// 種類が入力されているか確認
function checkInputType(number) {
    let num = number;
    let val = document.getElementById("type" + num).value;
    if (val == "") {
        document.getElementById("typenone" + num).style.display = "block";
    } else {
        document.getElementById("typenone" + num).style.display = "none";
    }
}

// カード画像切り取り
function imgTrim() {
    $(function() {
        $("#uploader").click();
        $("#exampleModalLong").modal();
    });
}

// cropper呼び出し
appendScript(
    "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.7/cropper.js"
);

// cropperの設定
let cropper = null;
//const scaledHeight = 500;
const scaledWidth = 600;

const cropImage = function(evt) {
    const files = evt.target.files;
    if (files.length == 0) {
        $("#exampleModalLong").modal("hide");
        return;
    }
    let file = files[0];
    let image = new Image();
    let reader = new FileReader();
    reader.onload = function(evt) {
        image.onload = function() {
            //let scale = scaledHeight / image.height;
            let scale = scaledWidth / image.width;
            let imageData = null;
            {
                const canvas = document.getElementById("sourceCanvas");
                {
                    let ctx = canvas.getContext("2d");
                    canvas.width = image.width * scale;
                    canvas.height = image.height * scale;
                    ctx.drawImage(
                        image,
                        0,
                        0,
                        image.width,
                        image.height,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );
                }
                if (cropper != null) {
                    // 画像を再読み込みした場合は破棄が必要
                    cropper.destroy();
                }
                cropper = new Cropper(canvas, {
                    aspectRatio: cropAspectRatio,
                    movable: false,
                    scalable: false,
                    zoomable: false,
                    rotatable: true,
                    data: {
                        width: canvas.width,
                        height: canvas.width * cropAspectRatio
                    },
                    crop: function(event) {
                        $("#canvas-button").one("click", function(e) {
                            let result = cropper.getCroppedCanvas();
                            $("#croppedCanvas2").attr(
                                "src",
                                result.toDataURL()
                            );
                        });
                        const croppedCanvas = document.getElementById(
                            "croppedCanvas"
                        );
                        {
                            let ctx = croppedCanvas.getContext("2d");
                            let croppedImageWidth =
                                image.height * cropAspectRatio;
                            croppedCanvas.width = image.width;
                            croppedCanvas.height = image.height;
                            croppedCanvas.width = croppedImageWidth * scale;
                            croppedCanvas.height = image.height * scale;
                            ctx.drawImage(
                                image,
                                event.detail.x / scale,
                                event.detail.y / scale,
                                event.detail.width / scale,
                                event.detail.height / scale,
                                0,
                                0,
                                croppedCanvas.width,
                                croppedCanvas.height
                            );
                            cropper.destroy();
                        }
                    }
                });
            }
        };
        image.src = evt.target.result;
    };
    reader.readAsDataURL(file);
    document.getElementById("canvas-button").style.display = "block";
};
const uploader = document.getElementById("uploader");
uploader.addEventListener("change", cropImage);

// カード画像プレビュー
function cardPreview() {
    $(function() {
        if ($("#cardCheck").prop("checked") == true) {
            $(".card").removeClass("is-surface");
            $("#card_surface").hide();
            cardCapture();
            $("#PreviewModal").modal();
            $("#card_surface").show();
        } else {
            if ($("#card_surface").hasClass("card_holo")) {
                $("#card_surface").removeClass("card_holo");
                $(".card").removeClass("is-reverse");
                $("#card_reverse").hide();
                cardCapture();
                $("#PreviewModal").modal();
                $("#card_reverse").show();
                $("#card_surface").addClass("card_holo");
            } else {
                $(".card").removeClass("is-reverse");
                $("#card_reverse").hide();
                cardCapture();
                $("#PreviewModal").modal();
                $("#card_reverse").show();
            }
        }
    });
}

// カードキャプチャ（html2canvas）
appendScript("../../js/html2canvas.js");
function cardCapture() {
    window.scrollTo(0, 0);
    html2canvas(document.querySelector("#card-cap-area"), {
        scale: 1,
        backgroundColor: null
    }).then(canvas => {
        // canvasをimgtタグに挿入できる形に変更
        let imageData = canvas.toDataURL();
        // imgタグに画像としてcanvasの内容を挿入
        document.getElementById("canvas-image").setAttribute("src", imageData);
        // aタグに画像としてcanvasの内容を挿入
        document.getElementById("image-download").setAttribute("href", imageData);
        document.getElementById("image-download2").setAttribute("href", imageData);
    });
}

//シェア機能
function cardShare(tempid) {
    //ランダム文字列を生成
    let l = 8;
    let c = "abcdefghijklmnopqrstuvwxyz0123456789";
    let cl = c.length;
    let filename = "";
    for (var i = 0; i < l; i++) {
        filename += c[Math.floor(Math.random() * cl)];
    }
    //テンプレートIDを付与
    tempid = tempid.toFixed();
    tempid = tempid.slice(-3);
    tempid = 100 + parseInt(tempid);
    filename = tempid + filename;

    //ajaxでカード画像をアップロード
    let imageData = document.getElementById("canvas-image").src;
    $.ajax({
        type: "POST",
        url: "../../js/data-post.php",
        data: {
            data: imageData,
            filename: filename
        }
    })
        // Ajaxリクエストが成功した時発動
        .done(data => {
            console.log("success");
            //Twitterへのシェアリンク呼び出し
            window.open(
                "http://twitter.com/share?url=https://charat.me/orica/share/" +
                    filename +
                    "&text=カードメーカーORICA(オリカ)でオリジナル免許証を作ったよ！&hashtags=ORICA&hashtags=オリカメーカー&hashtags=免許証",
                "_blank"
            );
        })
        // Ajaxリクエストが失敗した時発動
        .fail(data => {
            console.log("fail");
            alert(
                "シェアURLの生成に失敗しました。再度お試しいただくか、ツイートに直接画像を添付してください。"
            );
        })
        // Ajaxリクエストが成功・失敗どちらでも発動
        .always(data => {});
    Script;
}
