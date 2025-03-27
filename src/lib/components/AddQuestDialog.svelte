<script>
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";

  import Plus from "lucide-svelte/icons/plus";
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: "default" })}>
			<Plus class="mr-2 size-4" />
			Add a quest
	</Dialog.Trigger>
	<Dialog.Content class>
		<Dialog.Header class>
			<Dialog.Title class>Add a quest</Dialog.Title>
			<!-- <Dialog.Description class>
				This action will add a quest.
			</Dialog.Description> -->
		</Dialog.Header>
		<hr>
		<form method="POST" action="?/create" class="flex-col space-y-4">
			<div class="pb-2 space-y-2">
				<label for="name">Name</label>
				<Input class="" id="name" type="text" name="name" placeholder="Name" />
			</div>
			<fieldset class="flex-col space-y-2 pb-2">
				<legend>Location</legend>
				<Input class="" type="number" name="latitude" step="any" placeholder="Latitude" />
				<Input class="" type="number" name="longitude" step="any" placeholder="Longitude" />
			</fieldset>
			<br/>
			<Button class="w-48 self-center" type="submit">
				Add a quest
			</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>