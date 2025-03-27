<script>
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input/index.js";

	import Pencil from "lucide-svelte/icons/pencil";

	let { quest } = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<div class="w-10 h-10 flex justify-center items-center rounded-full hover:text-white hover:bg-gray-500">
			<Pencil/>
		</div>
	</Dialog.Trigger>
	<Dialog.Content class>
		<Dialog.Header class>
			<Dialog.Title class>Edit a quest</Dialog.Title>
			<!-- <Dialog.Description class>
				This action will edit a quest.
			</Dialog.Description> -->
		</Dialog.Header>
		<hr>
		<form method="POST" action="?/edit" class="flex flex-col space-y-2">
			<input type="hidden" name="id" value={quest.id} />
			<div class="pb-2 space-y-2">
				<label for="name">Name</label>
				<Input class="" id="name" type="text" name="name" value={quest.name} placeholder="Name" />
			</div>
			<fieldset class="flex-col space-y-2 pb-2">
				<legend>Location</legend>
				<Input class="" type="number" name="latitude" value={quest.location.coordinates[1]} placeholder="Latitude" />
				<Input class="" type="number" name="longitude" value={quest.location.coordinates[0]} placeholder="Longitude" />
			</fieldset>
			<br/>
			<Button class="w-48 self-center" type="submit">
				Edit
			</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>