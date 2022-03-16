import React from 'react';
import { useState } from 'react';
import styles from './Profile.module.css';
const Profile = () => {
    const [data, setData] = useState({});
    const [username, setUsername] = useState('');
    const [repos, setRepos] = useState([]);

    const onChangeHandler = (e) => {
        setUsername(e.target.value);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setUsername('');
                console.log(data);
                const repos = data.repos_url;
                const reposArray = repos.split('{');
                const reposUrl = reposArray[0];
                fetch(reposUrl)
                    .then(res => res.json())
                    .then(repos => {
                        setRepos(repos);
                        console.log(repos);
                    }
                    )
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div className={styles.wrapper}>
            <div className={styles.items}>
            <input type='text' value = {username} onChange = {onChangeHandler}  />
            <button type='submit' onClick={submitHandler} >Search</button>
            </div>
           {data.name && <div className={styles.info}>
                <img src={data.avatar_url} alt='avatar' />
                <div>
                    <h3><a href={`https://github.com/${data.login}`} >{data.name}</a></h3>
                    <p>{data.bio}</p>
                    <p>{data.location}</p>
                    <p>{data.blog}</p>


            </div>
            </div>}
            <div className={styles.repos}>
        {repos.map(repo => (
          
            <div className={styles.repo}>
                <h3><a href={`https://github.com/${data.login}/${repo.name}`} > {repo.name}</a></h3>
                <p>{repo.description}</p>
                <p>language: {repo.language}</p>
                <p> stars :{repo.stargazers_count}</p>
                </div>
               
        ))}
         </div>


        </div>
        </div>

    );
}

export default Profile;
