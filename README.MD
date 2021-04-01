# The abbieschenk Theme
A Hugo theme I created for my own site. It has a minimal style, a specific focus on photography, and two content types: posts and projects. It should be easy to set this up for your own site out of the box — but note I have only tested this for my own purposes, and so going beyond that might break things. I have included some handy helpers detailed below to make it easier to customize.

I recommend forking this if you want to use it.

My website abbieschenk.com is always running the latest version of this theme. It's also on [GitHub]() if you want to see an example.

## Table of Contents
- [Config](#config)
  - [General](#general)
  - [Main Menu](#main-menu) 
  - [Social Menu](#social-menu)
- [Posts and Projects](#posts-and-projects)
  - [Archetypes](#archetype)
  - [Cloudinary](#cloudinary)
- [Customization](#customization)
  - [Custom SCSS](#custom-scss)
  - [Site Icon](#site-icon)
  - [Favicons](#favicons)
  - [Site Image](#site-image)
  - [User-Defined Header and Footer](#user-defined-header-and-footer)

## Config

### General
You'll need to set up your site's config.toml. You should include the following defaults:

```toml
baseURL = "http://localhost" # change to your site's base URL
languageCode = "en-ca"
title = "Your Site Title"
theme = "hugo-theme-abbieschenk"
googleAnalytics = "G-IDCODE" # optional

[author]
  name = "Your Name"

[permalinks]
  post = "/:filename/"

[taxonomies]
  tags = "tags" # this theme only supports the tag taxonomy

[params]
  dateFormat = "Jan 2, 2006" 
  accentColor = "#53705C" # used throughout the site
  cloudinary = "your_cloudinary_account" # add your cloudinary account name
  twitter = "@your_twitter" # used for <head> Twitter metadata
```

For date formats, see the [Hugo Date and Time Templating Reference](https://gohugo.io/functions/format/#hugo-date-and-time-templating-reference).

### Main Menu

To add the menus I have on my site, add the following to your config.toml:

```toml
[menu]
  [[menu.main]]
    name = "Home"
    url = "/"
    weight = 1
  [[menu.main]]
    name = "Projects"
    url = "/projects/"
    weight = 2
  [[menu.main]]
    name = "Posts"
    url = "/posts/"
    weight = 3

    # Social menus go here
```

### Social Menu
Add social menus by adding the following for each entry within the parent `[menu]` tag, just after the main menu list.

```toml
  [[menu.social]]
    name = "Instagram"
    pre = "instagram" # The icon to use
    url = "https://instagram.com/instagram"
    weight = 1

```

This site uses [Feather](https://feathericons.com) icons. Check the site if the icon you referenced does not show up.

## Posts and Projects

Posts and Projects are functionally the same for now, but show up in two different locations. The page for an individual tag will also separate Posts and Projects in the display. The rest of this will refer to both content types as "Posts."

### Archetype
The post archetype includes the following:

```toml
title: "Hello Friend"
description: "An example of a post"
date: 2021-03-24T16:20:00-07:00
tags: ["photography", "code"]
draft: false
```

Descriptions should be max 140 characters, as they are also entered into the site's metadata. This isn't a hard limit, but will prevent the description from being cut off by search engines.

### Cloudinary
Cloudinary images can be easily added to your posts with the Cloudinary shortcode:

```go
{{< cloudinary 
  src="folder/path-to-your-image.jpg" 
  alt="Alt text for accessibility" 
  caption="An optional caption for the image" >}}
```

**Always include either descriptive alt text or a caption for all of your images for site accessibility!**

As a convenient reminder to form a habit, the site will refuse to build if you forget to include alt text or a caption on one of your images. [See w3.org](https://www.w3.org/WAI/tutorials/images/tips/) for some tips on how to write alt text.

### YouTube

YouTube videos show at 100% width when using the default Hugo shortcode. I added a shortcode using [gaetawoo's solution](https://discourse.gohugo.io/t/youtube-container-size-issues/7442/4) on the Hugo forums, and wraps it all in a div with the .youtubex class. Since the original YouTube shortcode might still be desired, this is called by using `{{< youtubex YoUtUBeID32 >}}`.

And as described in the post on the forum, it's possible to define your own aspect ratio (although this isn't necessarily necessary).

```go
{{< youtube Pt9MjE70Fd8 >}}
{{< youtube Pt9MjE70Fd8 widescreen >}}
{{< youtube Pt9MjE70Fd8 standard >}}
{{< youtube Pt9MjE70Fd8 "16:9" >}}
{{< youtube Pt9MjE70Fd8 "4:3" >}}
{{< youtube Pt9MjE70Fd8 "235:100" >}}

/* And it even works with vertical videos */
{{< youtube 17uHCHfgs60 "9:16" >}}
```

## Customization

### Custom SCSS

To add custom scss without overwriting the whole main.scss file, create a "user.scss" file in your site's /assets/scss/ directory. You can use any of the variables defined in main.scss, such as `$accent-colour`, or the various font mixins.

### Site Logo
To replace the placeholder logo, add a logo.svg in your site's /assets/svg. My logo is 400x100 pixels. If your logo has different dimensions, you will likely need to adjust the CSS "left" property (see below). The logo also works best with monochrome colours, as it uses a "difference" blend mode with the background to create a photo-negative-like effect when scrolling over images.

See the styling in main.scss for reference and to change this behaviour, such as by including and adjusting this in your [custom scss](#custom-scss):

```scss
#site-logo {
  mix-blend-mode: normal;

  top: 1.0rem; //adjust accordingly
  width: 220px; //adjust accordingly

  left: -webkit-calc((100% - 750px) / 2 - 250px); // adjust
  left:    -moz-calc((100% - 750px) / 2 - 250px); // adjust
  left:         calc((100% - 750px) / 2 - 250px); // adjust

  svg {
    fill: inherit;

    &:hover {
      fill: $accent-color;
    }
  }

  @media (max-width: $break-point-max-w-1) {
    left: 5%; //adjust accordingly
  }
}
```

### Favicons
To replace the placeholder, add three files to your site's /static/ folder: favicon.ico, icon.svg, and apple-touch-icon.png. I recommend [this](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs) tutorial to figure out how to create those files. If you wish to add more options, you will need to add the appropriate `<link>` tags in [user-head.html](#user-defined-header-and-footer).

### Site Image
Add an image to your site at /assets/img/default.jpg to replace the default site image. This is only used for social media cards, and only on the home page.

### User-Defined Header and Footer
You may want to add additional scripts, links, etc. to your user header or below the footer. To do so without copy + pasting the contents of the existing head.html and baseof.html, you only need to overwrite the user-head.html and user-script.html by creating these files in your site's /layouts/partials/. These are left blank by default. 

user-head.html is added at the end of head.html, before the title tag.

user-script.html is added after the script tags, below the footer. 

Of course if you want to do something more complicated, feel free to overwrite the head.html/baseof.html as usual!