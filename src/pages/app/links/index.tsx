import { QRCodeCanvas } from 'qrcode.react';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import LinkService from '../../../api/v1/link';
import Badge from '../../../components/Badge';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import VerticalBar from '../../../components/chart/VerticalBarChart';
import Text from '../../../components/input/TextInput';
import SearchInput from '../../../components/input/SearchInput';
import { LinkType, LinksType } from '../../../interfaces/link';
import { formatDateTime } from '../../../utils/date';
import CardSkeleton from '../../../components/skeleton/CardSkeleton';
import CardImageSkeleton from '../../../components/skeleton/CardImageSkeleton';

const AppLinksPage: FC = () => {
  const [links, setLinks] = useState<LinksType | undefined>();
  const [loading, setLoading] = useState(true);
  const [linkDetailLoading, setLinkDetailLoading] = useState(true);
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
      if (response.data.length === 0) {
        return;
      }
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
    await fetchLinks(true);
    setLoading(false);
    setLinkDetailLoading(false);
  };

  const handleClickSingleLink = async (id: any) => {
    setLinkDetailLoading(true);
    await fetchLink(id);
    await fetchVisits(id);
    setLinkDetailLoading(false);
  };

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.info(t('copied'));
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

    const linkService = new LinkService();
    const formData = new FormData(e.currentTarget);
    const request = await linkService.update(link?.id, {
      url: formData.get('url') as string,
      name: formData.get('name') as string,
    });
    setLink(request);
    await fetchLinks();
    await fetchVisits(link?.id);
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
    <>
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

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-4">
        <div className="md:min-h-[1000px]">
          <form className="mb-4 lg:p-2" onSubmit={handleSearch}>
            <SearchInput placeholder={t('search')} name="search" />
          </form>

          <ul className="grid gap-4 max-h-[80vh] md:overflow-y-auto overflow-x-auto lg:p-2">
            {loading && (
              <>
                <li>
                  <CardSkeleton />
                </li>
                <li>
                  <CardSkeleton />
                </li>
                <li>
                  <CardSkeleton />
                </li>
              </>
            )}

            {!loading &&
              links?.data.map((linkDetail) => (
                <li className="min-w-0" key={linkDetail.id}>
                  <Card
                    className={`cursor-pointer ${
                      linkDetail.id === link?.id ? 'bg-neutral text-neutral-content' : ''
                    }`}
                    onClick={() => handleClickSingleLink(linkDetail.id)}
                  >
                    <div>
                      <h5 className="mb-2.5 overflow-hidden truncate text-ellipsis block">
                        {linkDetail.name ? linkDetail.name : `${hostname}/${linkDetail.short_url}`}
                      </h5>
                      <p className="flex flex-nowrap gap-2 items-center">
                        {t('url')}:
                        <Badge
                          className="overflow-hidden truncate text-ellipsis block cursor-pointer"
                          onClick={(e: any) => {
                            e.stopPropagation();
                            handleCopy(`${hostname}/${linkDetail.short_url}`);
                          }}
                        >
                          <span>
                            <i className="fa-solid fa-copy mr-2"></i>
                            {`${hostname}/${linkDetail.short_url}`}
                          </span>
                        </Badge>
                      </p>
                      <p className="flex flex-nowrap gap-2 items-center">
                        <span className="whitespace-nowrap"> {t('original-url')}:</span>
                        <Badge
                          className="overflow-hidden truncate text-ellipsis block cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(linkDetail.url);
                          }}
                        >
                          <i className="fa-solid fa-copy mr-2"></i>
                          <span>{linkDetail.url}</span>
                        </Badge>
                      </p>
                      <p>
                        <i className="fa-solid fa-eye" /> {linkDetail.visit_count}
                      </p>
                    </div>
                  </Card>
                </li>
              ))}
          </ul>
        </div>

        <div className='min-w-0'>
          {linkDetailLoading && <CardImageSkeleton />}
          {!linkDetailLoading && link && (
            <Card className="mb-4 min-w-0">
              <h3 className="mb-4 truncate text-ellipsis">{link.name}</h3>
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
                    <p className="mx-auto">
                      <i className="fa-solid fa-eye" /> {link.visit_count}
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
                      onClick={() => handleCopy(`${hostname}/${link.short_url}`)}
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
                    {t('created-at')}: {formatDateTime(link.created_at as string)}
                  </small>
                  <br />
                  <small>
                    {t('updated-at')}: {formatDateTime(link.updated_at as string)}
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
          )}
        </div>
      </div>
    </>
  );
};

export default AppLinksPage;
