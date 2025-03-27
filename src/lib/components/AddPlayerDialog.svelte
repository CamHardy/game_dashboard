<script>
  import {
    Button,
    buttonVariants
  } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  import Plus from "lucide-svelte/icons/plus";
	import CircleFadingArrowUp from "lucide-svelte/icons/circle-fading-arrow-up";
	import Heart from "lucide-svelte/icons/heart";
	import Sword from "lucide-svelte/icons/sword";
	import Zap from "lucide-svelte/icons/zap";
	import DollarSign from "lucide-svelte/icons/dollar-sign";
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: "default" })}>
			<Plus class="mr-2 size-4" />
			Add a player
	</Dialog.Trigger>
	<Dialog.Content class>
		<Dialog.Header class>
			<Dialog.Title class>Add a player</Dialog.Title>
			<!-- <Dialog.Description class>
				This action will add a player.
			</Dialog.Description> -->
		</Dialog.Header>
		<hr>
		<form method="POST" action="?/create" class="flex flex-col space-y-4">
			<div class="pb-2 space-y-2">
				<label for="username">Username</label>
				<Input class="" id="username" type="text" name="username" placeholder="Enter a username" />
			</div>
			<div class="space-y-2">
				<label for="inventory">Player Stats</label>
				<div class="flex justify-between space-x-4 pb-2">
					<div title="Experience" class="flex justify-between items-center space-x-2">
						<div class="w-5 h-5 z-10 flex justify-center items-center">
							<CircleFadingArrowUp/>
						</div>
						<Input class="" type="number" name="experience" placeholder="EXP" aria-label="Experience" />
					</div>
					<div title="Health" class="flex justify-between items-center space-x-2">
						<div class="w-5 h-5 z-10 flex justify-center items-center text-red-500">
							<Heart/>
						</div>
						<Input class="" type="number" name="health" placeholder="HP" aria-label="Health"/>
					</div>
					<div title="Damage" class="flex justify-between items-center space-x-2">
						<div class="w-5 h-5 z-10 flex justify-center items-center">
							<Sword/>
						</div>
						<Input class="" type="number" name="damage" placeholder="DMG" aria-label="Damage"/>
					</div>
					<div title="Energy" class="flex justify-between items-center space-x-2">
						<div class="w-5 h-5 z-10 flex justify-center items-center text-yellow-500">
							<Zap/>
						</div>
						<Input class="" type="number" name="energy" placeholder="ENG" aria-label="Energy"/>
					</div>
				</div>
				<div title="Currency" class="flex justify-between items-center space-x-2 pb-2">
					<div class="w-5 h-5 z-10 flex justify-center items-center text-green-500">
						<DollarSign/>
					</div>
					<Input class="" type="number" name="currency" placeholder="Currency" aria-label="Currency"/>
				</div>
			</div>
			<div class="space-y-2">
				<label for="inventory">Inventory</label>
				<!-- <div class="h-64 px-4 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" >
					<CodeInput
						id="inventory"
						title="Inventory"
						autoHeight={false}
						resize="vertical"
						placeholder={
							JSON.stringify({
								items: [],
								equipped_items: [],
								action_items: []
							}, null, 2)}
						highlightjs={hljs}
						onChange={(/** @type { String } val */ val) => value = val}
						{value}
						language={'json'}
					/>
				</div> -->
				<textarea
					class="px-4 py-2 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					rows="10"
					name="inventory"
					value={JSON.stringify({
						"items": [],
						"action_items": [],
						"equipped_items": []
					}, null, 2)}
					placeholder="Inventory"></textarea>
			</div>
			<Button class="w-48 self-center" type="submit">
				Add a player
			</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>