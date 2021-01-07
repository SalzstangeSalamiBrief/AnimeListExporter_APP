import calcNewStatus from './calculate-status';
import ListItemInterface from '../interfaces/list-item';
import UserDataInterface from '../interfaces/user-data';
import ListInterface from '../interfaces/list';

import { checkIsListIsValid } from './validator';

export function calcAnimeFormat({
  status,
  media: { idMal, title: { romaji } },
  progress,
  score,
  notes,
  repeat,
}: ListItemInterface) {
  // planning, completed, paused, current
  const newStatus = calcNewStatus(status, 'ANIME');
  return `
      <anime>
        <series_animedb_id>${idMal}</series_animedb_id>
        <series_title><![CDATA[${romaji}]]></series_title>
        <series_type></series_type>
        <series_episodes>${progress}</series_episodes>
        <my_id>123456</my_id>
        <my_watched_episodes>${progress}</my_watched_episodes>
        <my_start_date>0000-00-00</my_start_date>
        <my_finish_date>0000-00-00</my_finish_date>
        <my_rated></my_rated>
        <my_score>${score}</my_score>
        <my_dvd></my_dvd>
        <my_storage></my_storage>
        <my_status>${newStatus}</my_status>
        <my_comments><![CDATA[${notes === null ? '' : notes}]]></my_comments>
        <my_times_watched>${repeat >= 0 ? repeat : ''}</my_times_watched>
        <my_rewatch_value></my_rewatch_value>
        <my_tags><![CDATA[]]></my_tags>
        <my_rewatching>0</my_rewatching>
        <my_rewatching_ep>0</my_rewatching_ep>
        <update_on_import>1</update_on_import>
      </anime>
  `;
}

/**
 * function which takes data of an manga and transform them into the corresponding xml format
 */
export function calcMangaFormat({
  media: { idMal, title: { romaji } },
  score,
  status,
  repeat,
  progress,
}: ListItemInterface): string {
  const newStatus = calcNewStatus(status, 'MANGA');
  return `
  <manga>
    <manga_mangadb_id>${idMal}</manga_mangadb_id>
    <manga_title><![CDATA[${romaji}]]></manga_title>
    <manga_volumes>10</manga_volumes>
    <manga_chapters>50</manga_chapters>
    <my_id>123456</my_id>
    <my_read_volumes>0</my_read_volumes>
    <my_read_chapters>${progress}</my_read_chapters>
    <my_start_date>0000-00-00</my_start_date>
    <my_finish_date>0000-00-00</my_finish_date>
    <my_scanalation_group><![CDATA[]]></my_scanalation_group>
    <my_score>${score}</my_score>
    <my_storage></my_storage>
    <my_status>${newStatus}</my_status>
    <my_comments><![CDATA[]]></my_comments>
    <my_times_read>${repeat >= 0 ? repeat : ''}</my_times_read>
    <my_tags><![CDATA[]]></my_tags>
    <my_reread_value></my_reread_value>
    <update_on_import>1</update_on_import>
  </manga>
  `;
}

/**
 * function which takes userdata and transform them into the corresponding xml format
 */
export function calcUserInfoFormat({
  username = '',
  type = 'ANIME',
  completed = 0,
  paused = 0,
  dropped = 0,
  planning = 0,
  total = 0,
  active = 0,
}: UserDataInterface): string {
  const result = '';
  if (username) {
    const typeInLowerCase = type.toLowerCase();
    const isTypeAnime = typeInLowerCase === 'anime';
    return `
      <myinfo>
        <user_id>123456</user_id>
        <user_name>${username}</user_name>
        <user_export_type>${isTypeAnime ? 1 : 2}</user_export_type>
        <user_total_${typeInLowerCase}>${total}</user_total_${typeInLowerCase}>
        <user_total_${isTypeAnime ? 'watching' : 'reading'}>${active}</user_total_${isTypeAnime ? 'watching' : 'reading'}>
        <user_total_completed>${completed}</user_total_completed>
        <user_total_onhold>${paused}</user_total_onhold>
        <user_total_dropped>${dropped}</user_total_dropped>
        <user_total_planto${isTypeAnime ? 'watch' : 'read'}>${planning}</user_total_planto${isTypeAnime ? 'watch' : 'read'}>
      </myinfo>
    `;
  }
  return result;
}

export function calcListStats(arrayOfLists: Array<ListInterface>):
{ [key: string]: number} {
  const result: { [key: string]: number } = { };

  const isListValid = checkIsListIsValid(arrayOfLists);
  if (isListValid) {
    for (let i = 0; i < arrayOfLists.length; i += 1) {
      const selectedList = arrayOfLists[i];
      const nameOfSelectedList = selectedList.name.toLowerCase();
      const entriesOfSelectedList = selectedList.entries.length;
      result[nameOfSelectedList] = entriesOfSelectedList;
    }
  }
  return result;
}
