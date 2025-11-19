// All Projects Data
// Add new projects to the top of this array (newest first)
// They will automatically appear on projects.html
// Only the first 4 will show on the home page

const allProjects = [
    {
        title: "Human-AI Intimacy Research Grant",
        description: "I was awarded a grant to characterize the prevalence, motivations, boundaries, and usage patterns of human-AI intimacy; and examine psychosocial, behavioral, and regional correlates associated with such use.",
        link: "#",
        linkText: "Link to Paper (preprint)",
        tags: ["Human Study Design", "Python", "Mixed-Methods Research"],
        image: null // null = placeholder, or use "images/project-name.jpg"
    },
    {
        title: "Cognitive Attention Age using a large cloud dataset",
        description: "Using All of Us data (800,000+ participants), my thesis evaluates how smoking, alcohol use, and social satisfaction relate to sustained attention using regression, spline models, and risk-score methods. I also built a secure web app that computes a user's d′ and cognitive age locally with no data stored or transmitted.",
        link1: "https://example.com/paper",
        linkText1: "Link to paper (preprint)",
        link2: "https://example.com/code",
        linkText2: "Link to web app",
        tags: ["UI/UX", "Machine Learning", "Data Analysis"],
        image: null
    },
    {
        title: "The Current State of Stem Cell Therapies for Neurological Disorders: A Meta-Analysis of Cell Types, Risks, and Translational Outcomes",
        description: "My meta-analysis paper reviews the major stem cell types used in neurological therapies and compares their biological properties. It evaluates their therapeutic potential alongside known risks and translational limitations.",
        link: "#",
        linkText: "Link",
        tags: ["Mobile", "Design"],
        image: null
    },
    {
        title: "Problem Children? When Embeddings Misbehave",
        description: " This was my Datathon team’s winning presentation at the 2025 Atlanta Datathon hosted by Emory University School of Medicine. I presented and helped develop both the idea and the slides for our project on bias in medical-image embedding foundation models.",
        link: "https://docs.google.com/presentation/d/1iWAs6DJMn8mY4hCjhmA5dZwBBBAqyDy4Z0o9BwZzVf0/edit?usp=sharing",
        linkText: "View Research",
        tags: ["Machine Learning", "Neuroscience", "Python", "Research"],
        image: null
    },
        {
        title: "NIMHD Study on Social Game Dynamics Influencing Physiological Responses",
        description: "Implemented a computer-mediated Cyberball model to examine how interactive game dynamics influence users’behavioral, affective, and physiological responses",
        link: "#",
        linkText: "Link",
        tags: ["Human Study Design", "Project Management"],
        image: null
    },

    // Add more projects here - they'll appear on projects.html but not on the home page
    // Example with single link:
    // {
    //     title: "Project Title",
    //     description: "Project description here...",
    //     link: "#",
    //     linkText: "Link",
    //     tags: ["Tag1", "Tag2"],
    //     image: null
    // }
    // Example with two links side-by-side:
    // {
    //     title: "Project Title",
    //     description: "Project description here...",
    //     link1: "https://example.com/paper",
    //     linkText1: "View Paper",
    //     link2: "https://example.com/code",
    //     linkText2: "View Code",
    //     tags: ["Tag1", "Tag2"],
    //     image: null
    // }
];

// Function to render a project item
function renderProject(project, index) {
    // Auto-generate image path: project1.jpg, project2.jpg, etc.
    // If project.image is explicitly set, use that; otherwise try project{index+1}.jpg
    let imagePath = project.image;
    if (!imagePath) {
        imagePath = `images/project${index + 1}.jpg`;
    }
    
    // Check if image exists (will show placeholder if image fails to load)
    const imageHTML = `<img src="${imagePath}" alt="${project.title}" onerror="this.parentElement.innerHTML='<div class=\\'work-placeholder\\'><span>Project Image</span></div>'">`;
    
    const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    // Support for two links: link1/linkText1 and link2/linkText2
    // Also support legacy single link/linkText for backward compatibility
    const link1 = project.link1 || project.link;
    const linkText1 = project.linkText1 || project.linkText;
    const link2 = project.link2;
    const linkText2 = project.linkText2;
    
    // Helper function to generate link HTML
    const createLinkHTML = (link, linkText, isSpan = false) => {
        if (!linkText) return '';
        const hasValidLink = link && link !== '#' && link.trim() !== '';
        const linkTarget = link && link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : '';
        
        if (isSpan || !hasValidLink) {
            return `<span class="work-link">${linkText}</span>`;
        }
        return `<a href="${link}" class="work-link" ${linkTarget}>${linkText}</a>`;
    };
    
    // Generate links HTML
    const linksHTML = `
        <div class="work-links">
            ${createLinkHTML(link1, linkText1)}
            ${link2 && linkText2 ? createLinkHTML(link2, linkText2) : ''}
        </div>
    `;
    
    // Always render as a non-clickable card with clickable links only
    return `
        <div class="work-item">
            <div class="work-image">
                ${imageHTML}
            </div>
            <div class="work-content">
                <h3 class="work-title">${project.title}</h3>
                <p class="work-description">${project.description}</p>
                ${linksHTML}
                <div class="work-tags">
                    ${tagsHTML}
                </div>
            </div>
        </div>
    `;
}

// Function to render projects to a container
function renderProjects(container, projects, limit = null) {
    if (!container) return;
    
    const projectsToShow = limit ? projects.slice(0, limit) : projects;
    // Map each project with its original index in the allProjects array
    container.innerHTML = projectsToShow.map((project, localIndex) => {
        // Find the original index in the full projects array
        const originalIndex = allProjects.indexOf(project);
        return renderProject(project, originalIndex);
    }).join('');
}

