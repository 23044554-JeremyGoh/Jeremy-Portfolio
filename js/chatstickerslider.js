(function () {
    var slidersContainer = document.querySelector('.sliders-container');

    var msNumbers = new MomentumSlider({
        el: slidersContainer,
        cssClass: 'ms--numbers',
        range: [1, 5],
        rangeContent: function (i) {
            return '0' + i;
        },
        style: {
            transform: [{ scale: [0.4, 1] }],
            opacity: [0, 1],
        },
        interactive: false,
    });

    var titles = [
        'Otter Waving',
        'Sad Otter',
        'Thinking Otter',
        'Shocked Otter',
        'Angry Referee Otter'
    ];
    var msTitles = new MomentumSlider({
        el: slidersContainer,
        cssClass: 'ms--titles',
        range: [0, 4],
        rangeContent: function (i) {
            return '<h3>' + titles[i] + '</h3>';
        },
        vertical: true,
        reverse: true,
        style: {
            opacity: [0, 1],
        },
        interactive: false,
    });

    var msLinks = new MomentumSlider({
        el: slidersContainer,
        cssClass: 'ms--links',
        range: [0, 4],
        rangeContent: function () {
            return '<a class="ms-slide__link">View Image</a>';
        },
        vertical: true,
        interactive: false,
    });

    var pagination = document.querySelector('.pagination');
    var paginationItems = [].slice.call(pagination.children);

    var msImages = new MomentumSlider({
        el: slidersContainer,
        cssClass: 'ms--images',
        range: [0, 4],
        rangeContent: function () {
            return '<div class="ms-slide__image-container"><div class="ms-slide__image"></div></div>';
        },
        sync: [msNumbers, msTitles, msLinks],
        style: {
            '.ms-slide__image': {
                transform: [{ scale: [1.5, 1] }],
            },
        },
        change: function (newIndex, oldIndex) {
            if (typeof oldIndex !== 'undefined') {
                paginationItems[oldIndex].classList.remove('pagination__item--active');
            }
            paginationItems[newIndex].classList.add('pagination__item--active');
        },
    });

    pagination.addEventListener('click', function (e) {
        if (e.target.matches('.pagination__button')) {
            var index = paginationItems.indexOf(e.target.parentNode);
            msImages.select(index);
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target.matches('.ms-slide__link')) {
            e.preventDefault();

            var slideIndex = Array.from(
                slidersContainer.querySelectorAll('.ms-slide__link')
            ).indexOf(e.target);
            var imageContainer = slidersContainer.querySelectorAll('.ms-slide__image')[
                slideIndex
            ];

            if (imageContainer) {
                var imageUrl = getComputedStyle(imageContainer).backgroundImage
                    .slice(5, -2);
                openModal(imageUrl);
            }
        }
    });

    function openModal(imageUrl) {
        var modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img src="${imageUrl}" alt="Full Image">
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.modal-close').addEventListener('click', function () {
            document.body.removeChild(modal);
        });
    }
})();

function goToPortfolio() {
    window.location.href = "index.html?skipPreloader=true#portfolio";
}