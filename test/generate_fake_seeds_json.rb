require 'faker'
require 'json'
require 'date'
require 'open-uri'
require 'base64'

#when ruby is installed, run script as as 'ruby generate_fake_seeds_json.rb'

NUMBER_OF_FAKES = 30

tagelers = []


NUMBER_OF_FAKES.times do
  s_dat = Faker::Date.forward(356)
  # TAGELERS
  tageler = {
    :title => Faker::ChuckNorris.fact,
    :text=>Faker::Hipster.paragraph(4),
    :group=>['Baghira', 'Tschil', 'Turmalin', 'Obsidian', 'Raschka', 'Rikki-Tikki', 'Bratwurscht'].sample,
    :start=> s_dat,
    :end=>Faker::Date.between(s_dat,s_dat+12),
    :bringAlong=>Faker::HarryPotter.quote,
    :uniform=>Faker::Hacker.say_something_smart,
    :picture=>Base64.strict_encode64(
      open('http://lorempixel.com/1200/900/').read
      ),
    :checkout=> {
      :deadline=>s_dat-3,
      :contact=>[{
        :name=>Faker::HarryPotter.character,
        :phone=>Faker::PhoneNumber.cell_phone,
        :mail=>Faker::Internet.email,
        :other=>Faker::Hacker.say_something_smart,
        }]
      },
    :free=>false
  }
  tagelers << tageler

end
fname = File.dirname(__FILE__) + '/tagelers.json'
File::open(fname,'w') do |f|
  f.write(tagelers.to_json)
end

=begin if you want to add GROUPS aswell
groups = [
  {
    :type=> 'Meute',
    :name=> 'Baghira'
  }, {
    :type=> 'Meute',
    :name=> 'Tschil'
  }, {
    :type=> 'Trupp',
    :name=> 'Turmalin'
  }, {
    :type=> 'Trupp',
    :name=> 'Obsidian'
  }, {
    :type=> 'Meute',
    :name=> 'Raschka'
  }, {
    :type=> 'Meute',
    :name=> 'Rikki-Tikki'
  }, {
    :type=> 'Meute',
    :name=> 'Bratwurscht'
  }
];
File::open('test/groups.json','w') do |f|
  f.write(groups.to_json)
end
=end
