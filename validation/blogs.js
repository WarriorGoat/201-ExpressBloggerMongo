
// Note: If we have a function, we want to return similar values for all possible return cases.
const validateBlogData = (blogData) => {


	if (blogData.title === undefined || typeof(blogData.title) !== "string" || blogData.title.length>40) {
		return {
			isValid: false,
			message: "Title is required and must be a string of 40 characters or less."
		}
	}

	if (blogData.author === undefined || typeof(blogData.author) !== "string" || blogData.author.length>40) {
		return {
			isValid: false,
			message: "Author's name is required and it must be a string of 40 characters or less."
		}
	}

	if (blogData.text === undefined || typeof(blogData.text) !== "string") {
		return {
			isValid: false,
			message: "Blog text is required and it must be a string."
		}
	}

	if (blogData.category === undefined) {
		return {
			isValid: false,
			message: "Blog category is required."
		}
	}
    if (!Array.isArray(blogData.category)) {
		return {
			isValid: false,
			message: "Blog category must be an array."
		}
	}
    if (blogData.category.length > 10) {
		return {
			isValid: false,
			message: "Blog category must be an array with 10 entries or less."
		}
	}


    const nonStringCategories = blogData.category.filter((nextCategory)=>{

		// If the callback function in .filter() returns true, then the item will be kept in the resultant array. If the callback returns false, the item will be filtered out
		if (typeof(nextCategory) !== 'string') {
			return true
		} else {
			return false
		}
	})


	if (nonStringCategories.length > 0) {
		return {
			isValid: false,
			message: "Categories must be an array of strings"
		}
	}


	// Test the categories to make sure they are on the approved list.
    const allowedCategories = ["Lorem", "ipsum", "dolor", "sit", "amet"];
    console.log(allowedCategories);
    const submittedCategories = blogData.category; //Converts the submitted category array into a string.
    console.log(submittedCategories);
    let compare = allowedCategories.filter(element => submittedCategories.includes(element));
    console.log(compare);
                if (compare.length === submittedCategories.length){
                    return {
                        isValid: true,
                        message: "categories did match"
                    };
                }else {
                    return {
                        isValid: false,
                        message: "Blog category must match the approved categories."
                    }
                }
	
	return {
		isValid: true
	}
}

module.exports = {
	validateBlogData,
}