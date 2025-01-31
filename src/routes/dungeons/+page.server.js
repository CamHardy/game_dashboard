import { API_URL } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		dungeons: await fetch(`${API_URL}/dungeon`).then(res => res.json()),
		isTemporary: false
	};
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		await fetch(`${API_URL}/dungeon/create`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: data.get('name') || 'unnamed dungeon',
				seed: data.get('seed') || 0,
				is_temporary: data.get('isTemporary') || false,
				expiry_time: data.get('expiryDate') || null
			})
		});
	},
	edit: async ({ request }) => {
		const data = await request.formData();
		await fetch(`${API_URL}/dungeon/update`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: data.get('id'),
				name: data.get('name') || 'unnamed dungeon',
				seed: data.get('seed') || 0,
				is_temporary: data.get('isTemporary') || false,
				expiry_time: data.get('expiryDate') || null
			})
		});
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		await fetch(`${API_URL}/dungeon/${id}`, {
			method: 'DELETE'
		});
	}
};