if (document.querySelector('#new-pet')) {
    document.querySelector('#new-pet').addEventListener('submit', (e) => {
        e.preventDefault();
        // Use FormData to grab everything now that we have files mixed in with text
        var form = document.getElementById("new-pet");
        var pet = new FormData(form);

        // Assign the multipart/form-data headers to axios does a proper post
        axios.post('/pets', pet, {
            headers: {
                'Content-Type': 'multipart/form-data;'
            }
        })
            .then(function (response) {
                window.location.replace(`/pets/${response.data.pet._id}`);
            })
            .catch(function (error) {
                const alertElement = document.getElementById('alert')
                alertElement.classList.add('alert-warning');
                alertElement.textContent = 'Oops, something went wrong saving your pet. Please check your information and try again.';
                alertElement.style.display = 'block';
                setTimeout(() => {
                    alertElement.style.display = 'none';
                    alertElement.classList.remove('alert-warning');
                }, 3000)
            });
    });
}