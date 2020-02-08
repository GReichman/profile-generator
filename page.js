const createPage = (info, colors) => {
    // console.log(info);
    // console.log(colors);

    const page =
        `
<!doctype html>
<html lang="en">

<head>
    <title>Title</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>

    <style>
        body {
            background-color: ${colors.base};
            color: white;
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        a:hover {
            text-decoration: none;
            color: inherit;
        }


        #headerRow {
            margin-top: 20px;
            padding: 5px;
            background-color: ${colors.head};
            text-align: center;
        }

        .bodyRow {
            background-color: ${colors.body};
            text-align: center;
            padding: 10px;
        }

        .infoCol {
            background-color: ${colors.head};
            margin-top: 10px;

        }

        @media only screen and (min-width: 766px) {
            .infoCol {
                margin-left: 10%;
            }
        }
    </style>

</head>

<body>
    <div class="container">

        <div class="row" id="headerRow">
            <div class="col-12">
                <img class="rounded-circle" src=${info.picture} alt="profile picture">
                <h1> ${info.name}</h1>
                <p>
                    <a href="https://www.google.com/maps/place/${info.location}">${info.location}</a>
                    <span>|</span>
                    <a href="https://www.github.com/${info.username}"> Github </a>
                    <span>|</span>
                    <a href=${info.blog}> Portfolio </a>
                </p>
            </div>
        </div>

        <div class="row bodyRow">

            <div class="col-12" id="bodyCol">
                <h3> ${info.bio} </h3>
            </div>
        </div>

        <div class="row bodyRow">
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 rounded infoCol">
                <h4>Public Repositories</h4>
                <p>${info.repos}</p>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 rounded infoCol">
                <h4>Github Stars</h4>
                <p>${info.stars}</p>
            </div>
        </div>

        <div class="row bodyRow">
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 rounded infoCol">
                <h4>Followers</h4>
                <p>${info.followers}</p>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 rounded infoCol">
                <h4>Following</h4>
                <p>${info.following}</p>
            </div>
        </div>

    </div>

</body>

</html>

`

return page;


}//createPage







module.exports = {
    createPage: createPage
}
