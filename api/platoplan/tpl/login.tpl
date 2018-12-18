<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Signin Template for Bootstrap</title>
    <!-- Bootstrap core CSS -->
    <link href="/css/Bootstrap/v4.1.3/Bootstrap.min.css" rel="stylesheet"/>

  </head>

  <body>
  <div class="container-fluid">
    <div class="row text-center">
      <div class="col-sm-12"><h1 class="h3 m-5 font-weight-normal">PlatoPlan login</h1></div> 
    </div>
     <div class="row text-center mt-5 mb-5">
      <div class="col-sm-12 p-5">
          <button class="btn btn-lg btn-primary btn-block" type="botton">Submit</button>
      </div> 
    </div>       
    <div class="row text-center mt-2 mb-2">
      <div class="col-sm-12  p-3">&copy; 2018 2019</div> 
    </div> 
  </div>
  <input name="token" value="{$token}"/>
    <input name="key" value="{$key}"/>
    <hr/>
     <input id="code" name="code" value=""/>
  </body>
    <script>
        localStorage.setItem("key", '{$key}');
        document.getElementById('code').value = localStorage.getItem("key");
    </script>    
</html>
