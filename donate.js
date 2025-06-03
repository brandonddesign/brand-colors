    // 3) Data Arrays for Donation Platforms & Crypto
    const platforms = [
      {
        name: 'Ko-fi',
        href: 'https://ko-fi.com/brandonhimpfen',
        img: 'https://srv-cdn.himpfen.io/badges/kofi/kofi-flat.svg'
      },
      {
        name: 'PayPal',
        href: 'https://paypal.me/brandonhimpfen',
        img: 'https://srv-cdn.himpfen.io/badges/paypal/paypal-flat.svg'
      },
      {
        name: 'Stripe',
        href: 'https://donate.stripe.com/cN2eYF2Ka2GwfgQ3cd',
        img: 'https://srv-cdn.himpfen.io/badges/stripe/stripe-flat.svg'
      }
    ];

    const cryptoAddresses = [
      {
        label: 'Bitcoin (BTC)',
        id: 'btcAddress',
        value: 'bc1qclwvlczcssytzs062g597cgkvxvv6y0c2pt4kp'
      },
      {
        label: 'Ethereum (ETH)',
        id: 'ethAddress',
        value: '0x2790493164eb64A70884C1921bF4571E8acc0f2E'
      },
      {
        label: 'Litecoin (LTC)',
        id: 'ltcAddress',
        value: 'ltc1qmjvrunurl835edlly36jjwdh820hze08tj0xgw'
      }
    ];

    // 4) Function to Build & Insert the Modal Content
    function populateDonateModal() {
      const container = document.getElementById('donateModalBody');
      container.innerHTML = ''; // Clear any existing content

      // A) Intro text
      const intro = document.createElement('p');
      intro.innerText =
        'Thank you ❤️ for considering a donation. Pick a platform or copy a crypto address:';
      container.append(intro);

      // B) Donation Platform Badges (Ko-fi, PayPal, Stripe)
      const badgeWrapper = document.createElement('div');
      badgeWrapper.classList.add('d-flex', 'justify-content-center', 'mb-3');

      platforms.forEach((plat) => {
        const link = document.createElement('a');
        link.href = plat.href;
        link.target = '_blank';
        link.rel = 'noopener';
        link.classList.add('mx-2');

        const img = document.createElement('img');
        img.src = plat.img;
        img.alt = plat.name;
        img.style.height = '25px';

        link.append(img);
        badgeWrapper.append(link);
      });
      container.append(badgeWrapper);

      // C) Divider
      const hr = document.createElement('hr');
      container.append(hr);

      // D) Crypto Section Heading
      const cryptoHeading = document.createElement('h6');
      cryptoHeading.innerText = 'Or donate via Crypto:';
      container.append(cryptoHeading);

      // E) Crypto Addresses + Copy Buttons
      cryptoAddresses.forEach((coin) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('crypto-address');

        const infoDiv = document.createElement('div');
        const label = document.createElement('strong');
        label.innerText = coin.label + ':';
        infoDiv.append(label);
        infoDiv.append(document.createElement('br'));

        const span = document.createElement('span');
        span.id = coin.id;
        span.innerText = coin.value;
        infoDiv.append(span);

        const copyBtn = document.createElement('button');
        copyBtn.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
        copyBtn.innerText = 'Copy';

        // Attach click listener to copy
        copyBtn.addEventListener('click', () => {
          navigator.clipboard
            .writeText(coin.value)
            .then(() => {
              copyBtn.innerText = 'Copied!';
              setTimeout(() => (copyBtn.innerText = 'Copy'), 1500);
            })
            .catch(() => {
              copyBtn.innerText = 'Error';
              setTimeout(() => (copyBtn.innerText = 'Copy'), 1500);
            });
        });

        wrapper.append(infoDiv, copyBtn);
        container.append(wrapper);
      });
    }

    // 5) Hook into Bootstrap’s “modal show” event
    const donateModalEl = document.getElementById('donateModal');
    donateModalEl.addEventListener('show.bs.modal', populateDonateModal);
