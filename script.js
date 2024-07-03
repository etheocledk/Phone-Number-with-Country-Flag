<script>
        function changeCountryCodes(button) {
            const countryCodes = button.getAttribute('data-country-codes').split(',');
            const countries = [{
                    name: "Bénin",
                    code: "BJ",
                    phone: 229
                },
                {
                    name: "Sénégal",
                    code: "SN",
                    phone: 221
                },
                {
                    name: "Congo RDC",
                    code: "CD",
                    phone: 243
                },
                {
                    name: "Nigeria",
                    code: "NG",
                    phone: 234
                },
                {
                    name: "Guinée",
                    code: "GN",
                    phone: 224
                }
            ];

            const selectBox = document.querySelector('.custom-options ol');
            selectBox.innerHTML = '';

            const filteredCountries = countries.filter(country => countryCodes.includes(country.code));

            filteredCountries.forEach(country => {
                const option = document.createElement('li');
                option.innerHTML = `
                    <div>
                        <span class="iconify" data-icon="flag:${country.code.toLowerCase()}-4x3"></span>
                    </div>
                    <strong>+${country.phone}</strong>`;
                option.setAttribute('data-phone', `+${country.phone}`);
                selectBox.appendChild(option);

                option.addEventListener('click', () => {
                    selectOptionByPhone(`+${country.phone}`);
                });
            });

            const firstOption = selectBox.querySelector('li');
            if (firstOption) {
                firstOption.click();
            }
        }

        function selectOptionByPhone(phone) {
            const selectedOption = document.querySelector('.selected-option .country-info');
            const selectedPhone = document.querySelector('.selected-option strong');
            const option = document.querySelector(`.custom-options ol li[data-phone="${phone}"]`);

            if (option) {
                const icon = option.querySelector('.iconify').cloneNode(true);
                const phoneCode = option.querySelector('strong').cloneNode(true);

                selectedOption.innerHTML = '';
                selectedOption.appendChild(icon);
                selectedOption.appendChild(phoneCode);

                const inputBox = document.querySelector('#phone_number');
                inputBox.value = '';

                document.querySelector('.custom-options').classList.remove('active');
                document.querySelector('.selected-option div').classList.remove('active');
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            const selectedOptionDiv = document.querySelector('.selected-option div');
            selectedOptionDiv.addEventListener('click', () => {
                document.querySelector('.custom-options').classList.toggle('active');
                selectedOptionDiv.classList.toggle('active');
            });

            const searchBox = document.querySelector('#search-box');
            searchBox.addEventListener('input', () => {
                const query = searchBox.value.toLowerCase();
                document.querySelectorAll('.custom-options ol li').forEach(option => {
                    const phone = option.getAttribute('data-phone').toLowerCase();
                    option.classList.toggle('hide', !phone.includes(query));
                });

                const isClickInside = document.querySelector('.select-box').contains(event.target);
                if (!isClickInside) {
                    document.querySelector('.custom-options').classList.remove('active');
                    document.querySelector('.selected-option div').classList.remove('active');
                }
            });

            const telInput = document.querySelector('#phone_number');
            telInput.addEventListener('input', () => {
                let phoneNumber = telInput.value.trim();
                if (phoneNumber.startsWith('+')) {
                    phoneNumber = phoneNumber.substring(1);
                }
                let selectedOption = document.querySelector(`.custom-options ol li[data-phone="+${phoneNumber}"]`);
                if (selectedOption) {
                    selectOptionByPhone(`+${phoneNumber}`);
                }
            });
        });
    </script>
