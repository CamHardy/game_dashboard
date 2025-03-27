import { API_URL } from '$env/static/private';
import { fail } from '@sveltejs/kit';

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
		const res = await fetch(`${API_URL}/quest/create`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: data.get('name') || 'unnamed quest',
				latitude: data.get('latitude') || 0,
				longitude: data.get('longitude') || 0,
			})
		});
		if (!res.ok) return fail(res.status, { success: false, message: 'Failed to create quest.' });
		return { success: true, message: 'Quest created' };
	},
	edit: async ({ request }) => {
		const data = await request.formData();
		const res = await fetch(`${API_URL}/quest/update`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: data.get('id'),
				name: data.get('name') || 'unnamed quest',
				latitude: data.get('latitude') || 0,
				longitude: data.get('longitude') || 0,
			})
		});
		if (!res.ok) return fail(res.status, { success: false, message: 'Failed to edit quest' });
		return { success: true, message: 'Quest edited' };
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const res = await fetch(`${API_URL}/quest/${id}`, {
			method: 'DELETE'
		});
		if (!res.ok) return fail(res.status, { success: false, message: 'Failed to delete quest.' });
		return { success: true, message: 'Quest deleted' };
	}
};