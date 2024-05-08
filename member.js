function skillsMember(){
    const skills = [
        'JavaScript',
        'React',
        'NodeJS',
        'HTML',
        'CSS'
    ];

    return (
        <div>
            <h1>Skills</h1>
            <ul>
                {skills.map(skill => (
                    <li key={skill}>{skill}</li>
                ))}
            </ul>
        </div>
    );
}