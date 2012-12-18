#Stickytables
Sticky ```<thead/>``` for tables. Even nested ones!
## Usage

### Sample Markup
```
<div id="container"> <!-- Always wrap it in something! -->
	<table class="data-table" id="table1">
		<thead>
			<tr>
				<th> Col1</th><th> Col2</th><th> Col3</th>
			<tr>
		</thead>
		<tbody>
			<tr>
				<td> Col1</td><td> Col2</td><td> Col3</td>
			<tr>
			<tr>
				<td> Col1</td><td> Col2</td><td> Col3</td>
			<tr>
			<tr>
				<td> Col1</td><td> Col2</td><td> Col3</td>
			<tr>
			<tr>
				<td> Col1</td><td> Col2</td><td> Col3</td>
			<tr>
		</tbody>
	</table>
</div>
...
```

###JS
```
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="stickytables.js"></script>
<script charset="utf-8" type="text/javascript">
    $(function(){
            $(".data-table").stickytable();
        });
</script>
```
### What else?
See ```examples/``` for more.
I've tested this is ie8-ie9 Chrome, FF. It works for me and I hope you can make use of it as well :)


