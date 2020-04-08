let data = [];
axios.get('http://localhost:3000/contact')
    .then((response) => {
        // console.log(response)
        const listsHTML = document.getElementById("dataList")
        data = response.data;

        data.forEach(item => {
            const { id, name, address, phone, email, company} = item;
            console.log(item);
            
            const itemHTML = `
            <tr>
                <th id='dataList' scope="row">${id}</th>
                <td>${name}</td>
                <td>${address}</td>
                <td>${phone}</td>
                <td>${email}</td>
                <td>${company}</td>
                <td>
                <button onclick="event.preventDefault(); changeContact(${id})" type="button" class="btn btn-success"><i class="fas fa-edit"></i></button>
                <button onclick="deleteContact(${id})" type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                </td>
            </tr>`;
            listsHTML.innerHTML += itemHTML;
        })
    })
    .catch((pesanError) => {
        console.error(pesanError);
    })

document.getElementById('submit').addEventListener('submit', (e) => {
    window.history.back();

    const name =  document.getElementById('name').value
    const address =  document.getElementById('address').value
    const email =  document.getElementById('email').value
    const phone =  document.getElementById('phone').value
    const company =  document.getElementById('company').value

    const URL = `http://localhost:3000/contact`
    axios.post(URL, {
        name,
        address,
        email,
        phone,
        company
      })
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });

    e.preventDefault()
}, false)
const URL = `http://localhost:3000/contact`
const deleteContact = id => {
    axios.delete(`${URL}/${id}`)
}
const changeContact = id => {
    const contact = data.find(item => {
        return item.id === id
    })
    
    if (contact){
        const name =  document.getElementById('name')
        name.value = contact.name
        const address =  document.getElementById('address').value
        address.value = contact.address
        const email =  document.getElementById('email').value
        email.value = contact.email
        const phone =  document.getElementById('phone').value
        phone.value = contact.phone
        const company =  document.getElementById('company').value
        company.value = contact.company
        axios.put(`http://localhost:3000/contact/${id}`,{
            name,
            address,
            email,
            phone,
            company
        });
    }
}
