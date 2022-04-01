import { 
    createBunny, 
    getFamilies, 
    checkAuth, 
    logout 
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async e => {
    // prevent default
    e. preventDefault();

    // get the name and family id from the form
    const formData = new FormData(form);

    const familyId = formData.get('family-id');
    const name = formData.get('bunny-name');

    // use createBunny to create a bunny with this name and family id
    // await createBunny(formData.get('bunny-name'), formData.get('family-id'));   //ISSUES
    await createBunny({
        name: name,
        family_id: familyId
    });

    form.reset();
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const selectEl = document.querySelector('select');

    // go get the families from supabase
    const familiesEl = await getFamilies();

    // for each family
    // create an option tag
    // set the option's value and text content

    for (let family of familiesEl) {
        const optionEl = document.createElement('option');
        
        optionEl.value = family.id;
        optionEl.textContent = family.name;
        
        // and append the option to the select
        selectEl.append(optionEl);
    }
});


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
