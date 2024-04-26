import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident suscipit, et, incidunt molestias harum dignissimos quam voluptatibus optio voluptas repellat a recusandae pariatur alias voluptates inventore id ab atque enim animi nesciunt deserunt saepe. Voluptate, aut nisi. Incidunt, sapiente totam libero, temporibus veritatis, quae distinctio perferendis exercitationem ut asperiores recusandae!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi obcaecati modi fugit doloremque corrupti voluptate incidunt odio provident perspiciatis tenetur aliquam laudantium, corporis veritatis itaque quasi ipsa enim rem error.</p>
        </div>
    </div>
  )
}

export default DescriptionBox