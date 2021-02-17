const url = `${process.env.NEXTAUTH_URL}/api/user`;

const createUsername = (email) => {
    return email.split("@")[0].substring(0,9);
}

const saveUser = async (user) => {
    const data = await fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: user.id,
            family_name: user.family_name || createUsername(user.email),
            email:user.email
        })
    })
    const result =  await data.json();
    return result.userId;
}

const getUser = async (id) => {
    const data = await fetch(`${url}/find-user`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    })
    const result =  await data.json();
    return result.user;    
}

export { getUser, saveUser };
