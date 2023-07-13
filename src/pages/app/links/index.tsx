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

const AppLinksPage: FC = () => {
  const [links, setLinks] = useState<LinksType>();
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState<LinkType>();
  const { t } = useTranslation();
  const hostname = window.location.origin;

  const fetchLinks = async () => {
    setLoading(true);
    const linkService = new LinkService();
    const response = await linkService.getAll();
    setLinks(response);
    setLoading(false);
  };

  const fetchLink = async (id: any) => {
    setLoading(true);
    const linkService = new LinkService();
    const response = await linkService.getOne(id);
    setLink(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const linkService = new LinkService();

    try {
      setLoading(true);
      const formData = new FormData(e.currentTarget);

      const request = await linkService.update(link?.id, {
        url: formData.get('url') as string,
      });

      setLink(request);
      await fetchLinks();
      setLoading(false);
    } catch (error) {
      alert(error);
    }
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

  return (
    <AppLayout>
      <div className="grid grid-cols-[1fr,2fr] gap-4">
        <ul className="grid gap-4 max-h-[70vh] overflow-y-scroll">
          {links?.data.map((link) => (
            <li className="min-w-0" key={link.id}>
              <Card className="cursor-pointer" onClick={() => fetchLink(link.id)}>
                <div>
                  <h5 className="mb-2.5">
                    {link.name ? link.name : `${hostname}/${link.short_url}`}
                  </h5>
                  <p>
                    {t('url')}: {link.short_url}
                  </p>
                  <p>
                    {t('total-visits')}: {link.visit_count}
                  </p>
                  <p className="flex flex-nowrap gap-2 items-center">
                    <span className="whitespace-nowrap"> {t('original-url')}:</span>
                    <Badge className="overflow-hidden truncate text-ellipsis block">
                      <a href={link.url}>{link.url}</a>
                    </Badge>
                  </p>
                </div>
              </Card>
            </li>
          ))}
        </ul>

        <div>
          {loading && <p>{t('loading')}...</p>}
          {!loading && link && (
            <>
              <Card className="mb-4">asd</Card>
              <Card className="flex flex-wrap gap-4">
                <Card className="w-fit flex flex-col">
                  <QRCodeCanvas
                    id="js-qr-code"
                    value={`${hostname}/${link.short_url}`}
                    size={200}
                    className="mb-4"
                  />
                  <Button
                    className="mx-auto"
                    label={t('download-qr-code')}
                    onClick={handleDownloadQRCode}
                  />
                </Card>

                <div className="flex-1">
                  <form onSubmit={handleSubmit}>
                    <Text name="url" label="URL" value={link.url} readOnly={true} />
                    <Button type="submit" label={t('update-url')} />
                  </form>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default AppLinksPage;
