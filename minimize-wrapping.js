function minimzeWrapping() {
	const getWidth = element => {
		return getComputedStyle(element).width;
	}
	const pixelToNumber = pixels => {
		return Number(pixels.slice(0, -2));
	}
	const getWidthAsNumber = (element) => {
		return element.offsetWidth + pixelToNumber(getComputedStyle(element).marginLeft) + pixelToNumber(getComputedStyle(element).marginRight);
	}
	const getLongestUnorderedTag = (tags, width) => {
		let longestTag;
		for (let i = 0; i < tags.length; i++) {
			const tag = tags[i];
			const tagWidth = pixelToNumber(getWidth(tag));
			if(!tag.style.order.length) {
				if(tagWidth < width) {
					if(!longestTag) {
						longestTag = tag;
					}
					if (pixelToNumber(getWidth(longestTag)) < tagWidth) {
						longestTag = tag;
					}
				}
			}
		}
		return longestTag;
	};
	const getShortestUnorderedTag = tags => {
		let shortestTag;
		for (var i = 0; i < tags.length; i++) {
			const tag = tags[i];
			const tagWidth = pixelToNumber(getWidth(tag));
			if(!tag.style.order.length) {
				if(!shortestTag) {
					shortestTag = tag;
				}
				if (pixelToNumber(getWidth(shortestTag)) > tagWidth) {
					shortestTag = tag;
				}
			}
		}
		return shortestTag;
	};
	const getShortestRemainingTagWidth = tags => {
		const shortestTag = getShortestUnorderedTag(tags);
		return getWidthAsNumber(shortestTag);
	};
	const minimizeWrappingOnParent = (container) => {
		const tags = container.querySelectorAll(".minimize-wrapping > *");
		const lineWidth = getWidthAsNumber(container);
		let remainingSpace = lineWidth;
		let longestTag = getLongestUnorderedTag(tags, lineWidth);
		let i = 1;
		longestTag.style.order = i;
		while(i < tags.length) {
			const longestTagWidth = getWidthAsNumber(longestTag);
			remainingSpace -= longestTagWidth;
			const shortestWidth = getShortestRemainingTagWidth(tags);
			if(remainingSpace < shortestWidth) {remainingSpace = lineWidth;}
			const fellowTag = getLongestUnorderedTag(tags, remainingSpace);
			fellowTag.style.order = i + 1;
			i++;
			longestTag = fellowTag;
		}
	};

	const containers = document.querySelectorAll(".minimize-wrapping");
	for (var i = 0; i < containers.length; i++) {
		const container = containers[i];
		minimizeWrappingOnParent(container);
	}
}

minimzeWrapping();