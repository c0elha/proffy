import Knex from 'knex';
import convertHourToMinutes from './../../utils/convertHourToMinutes';

export async function seed(knex: Knex){
  const insertUsersIds = await knex('users').insert([
    { 
      name: 'Geovana Coelho', 
      avatar: 'https://avatars2.githubusercontent.com/u/24981078', whatsapp: '(14) 44444-3333', 
      bio: 'Adora ensinar matérias como matemática, geografia e história.'
    },
  ]);

  const user_id = insertUsersIds[0];

  const insertedClassesIds = await knex('classes').insert([
    { subject: 'História', cost: "50", user_id: user_id },  
    { subject: 'Geografia', cost: "55", user_id: user_id },
    { subject: 'Matemática', cost: "60", user_id: user_id }
  ]);
 
  await knex('class_schedule')
    .insert([
      { class_id: insertedClassesIds[0] - 2, week_day: 1, from: convertHourToMinutes('08:00'), to: convertHourToMinutes('09:00') },
      { class_id: insertedClassesIds[0] - 1, week_day: 2, from: convertHourToMinutes('10:00'), to: convertHourToMinutes('11:00') },
      { class_id: insertedClassesIds[0], week_day: 3, from: convertHourToMinutes('14:00'), to: convertHourToMinutes('15:00') }
    ]);
}