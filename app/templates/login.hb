<div class="container" id="login">
  <form id="loginform" role="form" {{action 'login' on='submit'}} >

    {{error-box errorMessages=errorMessages}}

    <div class="input-group">
      <span class="input-group-addon"><i class="glyphicon glyphicon-user medium text-gray-medium"></i></span>
      {{input value=username type="text" class="form-control" placeholder="Username"}}
    </div>
    <div class="input-group">
      <span class="input-group-addon"><i class="glyphicon glyphicon-lock medium text-gray-medium"></i></span>
      {{input value=password type="password" class="form-control" placeholder="Password"}}
    </div>
    
    <button type="submit" class="btn btn-primary">SIGN IN</button>
  </form>
  <div class="fixed-bottom forget-password">
{{!--     {{#link-to 'users.forgotpassword' class="btn btn-red-flat btn-block mtl"}}
      <i class="glyphicon glyphicon-question-sign"></i><span>Forgot password?</span>
    {{/link-to}} --}}
  </div>
</div>
