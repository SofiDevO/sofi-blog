import { fade } from "astro:transitions";

const PostCard = ({
  link,
  title,
  excerpt,
  image,
  altdesc,
  author,
  altText,
  authorImage,
  authorFirstName,
  authorLastName,
  categories,
  date,
  key
}) => {

  const formatDate = new Date(date);
  const day = formatDate.getDate();
  const month = formatDate
    .toLocaleString("default", { month: "long" })
    .slice(0, 3);
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = formatDate.getFullYear();
  const newDateFormat = `${day} / ${capitalizedMonth} / ${year}`;

  return (
    <article className="post-card"   >
      {/* Imagen del post */}
      <div className="post-card__image-container">
        <img
          alt={altdesc}
          src={image || "/img/branding/logo.png"}
          className="post-card__image"
        />
        <div className="post-card__image-overlay"></div>
      </div>

      {/* Contenido del post */}
      <div className="post-card__content">
        {/* Autor e información adicional */}
        <div className="post-card__author">
          <img
            src={authorImage}
            alt={`${authorFirstName} ${authorLastName}`}
            className="post-card__author-image"
          />
          <div className="post-card__author-info">
            <p className="post-card__author-name">
              {authorFirstName} {authorLastName}
            </p>
            <time dateTime={date} className="post-card__date">
              <iconify-icon icon="majesticons:clock"></iconify-icon>
              {newDateFormat}
            </time>
          </div>
        </div>

        {/* Título */}
        <a href={link}

        data-astro-prefetch
        >
          <h3 className="post-card__title group">
            {title}
            <iconify-icon
              icon="ri:links-line"
              className="group-hover:opacity-100 opacity-0 transition-all duration-200 ease-linear"
            ></iconify-icon>
          </h3>
        </a>

        <div
          className="post-card__excerpt"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />


        {/* Categorías */}
        <div className="post-card__categories">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="post-card__category"
              data-astro-reload
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PostCard;
