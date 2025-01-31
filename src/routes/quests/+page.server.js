import { API_URL } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		quests: await fetch(`${API_URL}/quest`).then(res => res.json())
	};
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		await fetch(`${API_URL}/quest/create`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: data.get('name') || 'unnamed quest',
				latitude: data.get('latitude') || 0,
				longitude: data.get('longitude') ||0,
			})
		});
	},
	edit: async ({ request }) => {
		const data = await request.formData();
		await fetch(`${API_URL}/quest/update`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: data.get('id'),
				name: data.get('name') || 'unnamed quest',
				latitude: data.get('latitude') || 0,
				longitude: data.get('longitude') || 0,
			})
		});
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		await fetch(`${API_URL}/quest/${id}`, {
			method: 'DELETE'
		});
	}
};