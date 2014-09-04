{{#if errorMessages}}
  <div class="alert alert-danger">
    <ul>
    {{#each item in errorMessages}}
      <li>{{item}}</li>
    {{/each}}  
    </ul>
  </div>
{{/if}}