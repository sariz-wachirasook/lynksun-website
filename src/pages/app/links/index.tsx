import React, { FC, useEffect, useState } from 'react';
import AppLayout from '../../../layouts/app';
import { LinkType, LinksType } from '../../../interfaces/link';
import LinkService from '../../../api/v1/link';
import Card from '../../../components/card';
import { useTranslation } from 'react-i18next';
import Badge from '../../../components/badge';
import Text from '../../../components/input/input';
import Button from '../../../components/button';
import { QRCodeCanvas } from 'qrcode.react';
import VerticalBar from '../../../components/chart/vertical-bar';
import SearchInput from '../../../components/input/search';

const AppLinksPage: FC = () => {
  const [links, setLinks] = useState<LinksType>();
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState<LinkType>();
  const [visits, setVisits] = useState<any[]>([]);

  const { t } = useTranslation();
  const hostname = window.location.origin;

  // ---------- fetch data ---------- //
  const fetchLinks = async (isFetchSingle = false) => {
    const linkService = new LinkService();
    const response = await linkService.getAll();
    setLinks(response);

    if (isFetchSingle) {
      await fetchLink(response.data[0].id);
      await fetchVisits(response.data[0].id);
    }
  };

  const fetchLink = async (id: any) => {
    const linkService = new LinkService();
    const response = await linkService.getOne(id);
    setLink(response);
  };

  const fetchVisits = async (id: any) => {
    const linkService = new LinkService();
    const response = await linkService.visits(id);
    setVisits(response);
  };

  useEffect(() => {
    init();
  }, []);

  // ---------- main function ---------- //
  const init = async () => {
    setLoading(true);
    await fetchLinks(true);
    setLoading(false);
  };

  const handleClickSingleLink = async (id: any) => {
    setLoading(true);
    await fetchLink(id);
    await fetchVisits(id);
    setLoading(false);
  };

  const handleCopy = (link: LinkType) => {
    const hostname = window.location.origin;
    navigator.clipboard.writeText(`${hostname}/${link.short_url}`);
  };

  const handleSubmitCreateNewLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const linkService = new LinkService();
    const response = await linkService.create({
      url: formData.get('url') as string,
      name: formData.get('name') as string,
    });

    setLink(response);
    await fetchLinks();
    await fetchVisits(response.id);
    setLoading(false);
    const form = document.getElementById('js-create-form') as HTMLFormElement;
    form.reset();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const linkService = new LinkService();
    const formData = new FormData(e.currentTarget);
    const request = await linkService.update(link?.id, {
      url: formData.get('url') as string,
      name: formData.get('name') as string,
    });
    setLink(request);
    await fetchLinks();
    await fetchVisits(link?.id);
    setLoading(false);
  };

  const handleDownloadQRCode = () => {
    const canvas = document.getElementById('js-qr-code') as HTMLCanvasElement;
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${link?.short_url}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const linkService = new LinkService();
    const response = await linkService.getAll({
      search: formData.get('search') as string,
    });
    setLinks(response);
    setLoading(false);
  };

  return (
    <AppLayout>
      <Card className="mb-4">
        <h2 className="mb-5">{t('create-new-link')}</h2>
        <form onSubmit={handleSubmitCreateNewLink} id="js-create-form">
          <Text name="name" label={t('name')} placeholder={t('name')} required />
          <Text
            name="url"
            label={t('enter-the-url')}
            placeholder={t('enter-the-url-you-want-to-shorten')}
            required
          />
          <Button type="submit" label={t('submit')} className="mb-5" />
        </form>
      </Card>

      <div className="grid grid-cols-[1fr,2fr] gap-4">
        <div>
          <form className="mb-4" onSubmit={handleSearch}>
            <SearchInput placeholder={t('search')} name="search" />
          </form>

          <ul className="grid gap-4 max-h-[80vh] overflow-y-scroll">
            {links?.data.map((linkDetail) => (
              <li className="min-w-0" key={linkDetail.id}>
                <Card
                  className={`cursor-pointer ${
                    linkDetail.id === link?.id ? 'bg-blue-100 dark:bg-blue-900' : ''
                  }`}
                  onClick={() => handleClickSingleLink(linkDetail.id)}
                >
                  <div>
                    <h5 className="mb-2.5 overflow-hidden truncate text-ellipsis block">
                      {linkDetail.name ? linkDetail.name : `${hostname}/${linkDetail.short_url}`}
                    </h5>
                    <p>
                      {t('url')}: {linkDetail.short_url}
                    </p>
                    <p>
                      {t('total-visits')}: {linkDetail.visit_count}
                    </p>
                    <p className="flex flex-nowrap gap-2 items-center">
                      <span className="whitespace-nowrap"> {t('original-url')}:</span>
                      <Badge className="overflow-hidden truncate text-ellipsis block">
                        <a href={linkDetail.url}>{linkDetail.url}</a>
                      </Badge>
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {loading && <p>{t('loading')}...</p>}
          {!loading && link && (
            <>
              <Card className="mb-4">
                <h3 className="mb-4">{link.name}</h3>

                {/* detail */}
                <div className="flex flex-wrap gap-4">
                  <div>
                    <Card className="w-fit flex flex-col">
                      <QRCodeCanvas
                        id="js-qr-code"
                        value={`${hostname}/${link.short_url}`}
                        size={200}
                        className="mb-4"
                      />
                      <Button
                        className="mx-auto mb-2.5"
                        label={t('download-qr-code')}
                        onClick={handleDownloadQRCode}
                      />
                      <p className='mx-auto'>
                        {t('total-visits')}: {link.visit_count}
                      </p>
                    </Card>
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-4">{t('short-url')}</h4>
                    <div className="grid grid-cols-[1fr,auto] gap-4 mb-4">
                      <Text
                        name="url"
                        className="mb-0"
                        required
                        value={link.short_url as string}
                        disabled
                        readOnly
                      />

                      <Button
                        label={t('copy')}
                        suffix={<i className="fa-solid fa-copy ml-2"></i>}
                        onClick={() => handleCopy(link)}
                      />
                    </div>
                    <hr className="my-4" />
                    <form onSubmit={handleSubmit}>
                      <Text
                        name="name"
                        label={t('name')}
                        defaultValue={link.name as string}
                        placeholder={t('name')}
                        required
                      />
                      <Text name="url" label={t('update-url')} defaultValue={link.url} required />
                      <Button type="submit" label={t('submit')} />
                    </form>
                    <hr className="my-4" />

                    <small>
                      {t('created-at')}: {link.created_at}
                    </small>
                    <br />
                    <small>
                      {t('updated-at')}: {link.updated_at}
                    </small>
                  </div>
                </div>
                <hr className="my-4" />

                {/* chart */}
                <VerticalBar
                  title={t('visits')}
                  datasets={[
                    {
                      label: t('last-7-days'),
                      data: visits.map((v) => v.count),
                      backgroundColor: '#3B82F6',
                    },
                  ]}
                  labels={visits.map((v) => v.date)}
                />
              </Card>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default AppLinksPage;