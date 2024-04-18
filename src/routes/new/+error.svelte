<script>
	import { page } from '$app/stores';
</script>

<h3>Error</h3>
<p>{$page.error?.message}</p>
<a href="/">Home</a>
<a href="/new">Retry</a>