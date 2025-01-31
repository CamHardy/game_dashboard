<script module>
	import House from "lucide-svelte/icons/House";
	import User from "lucide-svelte/icons/User";
	import MapPin from "lucide-svelte/icons/Map-pin";
	import Plus from "lucide-svelte/icons/plus";
	import * as Dialog from "$lib/components/ui/dialog/index.js";

	const data = {
		versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
		navMain: [
			{
				title: "Pages",
				items: [
					{
						title: "Home",
						url: "/",
						icon: House,
						isActive: false,
					},
					{
						title: "Dashboard",
						url: "/dashboard",
						icon: House,
						isActive: false,
					}
				]
			},
			{
				title: "Tables",
				items: [
					{
						title: "Players",
						url: "/players",
						icon: User,
						isActive: false,
					},
					{
						title: "Quests",
						url: "/quests",
						icon: MapPin,
						isActive: false,
					},
					{
						title: "Dungeons",
						url: "/dungeons",
						icon: House,
						isActive: false,
					}
				],
			}
		],
	};
</script>

<script>
	import VersionSwitcher from "$lib/components/version-switcher.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	let { ref = $bindable(null), ...restProps } = $props();
</script>

<Sidebar.Root {...restProps} bind:ref>
	<Sidebar.Header>
		For The Quest
		<!-- <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} /> -->
	</Sidebar.Header>
	<Sidebar.Content>
		<!-- We create a Sidebar.Group for each parent. -->
		{#each data.navMain as group (group.title)}
			<Sidebar.Group>
				<Sidebar.GroupLabel>{group.title}</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each group.items as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton isActive={item.isActive}>
									{#snippet child({ props })}
										<a href={item.url} {...props}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
