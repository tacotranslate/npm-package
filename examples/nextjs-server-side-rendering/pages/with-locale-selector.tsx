import {useRouter} from 'next/router';
import React, {ChangeEvent, useCallback, useState} from 'react';
import createTacoTranslateClient, {
	useTranslate,
	TranslationProvider,
} from 'tacotranslate';
import locales from '../locales.json';

const tacoTranslate = createTacoTranslateClient({apiKey: '23423489729834792'});

const MyComponent = () => {
	const Translate = useTranslate();
	return <Translate>{'Hello, world!'}</Translate>;
};

const MyPage = ({url, inputLocale, outputLocale, translations}) => {
	const router = useRouter();
	const [currentInput, setCurrentInput] = useState(outputLocale);

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const locale = event.target.value;
			setCurrentInput(locale);
			document.cookie = `NEXT_LOCALE=${locale.toLowerCase()}; Max-Age=31560000; SameSite=Lax; Path=/;`;

			router.push(router.pathname, router.pathname, {
				locale: locale.toLowerCase(),
			});
		},
		[router]
	);

	return (
		<TranslationProvider
			url={url}
			client={tacoTranslate}
			inputLocale={inputLocale}
			outputLocale={outputLocale}
			translations={translations}
		>
			<select value={currentInput} onChange={handleChange}>
				{locales.map(([locale, name]) => (
					<option key={locale} value={locale}>
						{name}
					</option>
				))}
			</select>

			<MyComponent />
		</TranslationProvider>
	);
};

export async function getServerSideProps(context) {
	const path = context.resolvedUrl ?? context.url;
	let url = `localhost:3000/${path}`;

	if (process.env.VERCEL_URL) {
		url = `${process.env.VERCEL_URL}/${path}`;
	} else if (context.request?.headers?.host) {
		url = `${context.request.headers.host}/${path}`;
	}

	const inputLocale = context.defaultLocale;
	const outputLocale = context.locale;
	const {getTranslations} = tacoTranslate({inputLocale, outputLocale});
	const translations = await getTranslations({url});

	return {
		props: {inputLocale, outputLocale, translations, url},
	};
}

export default MyPage;
