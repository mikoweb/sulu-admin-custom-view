<?php

namespace App\Module\Custom\Infrastructure\DataFixtures;

use App\Module\Custom\Domain\Entity\Sample;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Persistence\ObjectManager;

final class SampleFixture extends Fixture implements OrderedFixtureInterface, FixtureGroupInterface
{
    public function load(ObjectManager $manager): void
    {
        for ($i = 0; $i < 100; ++$i) {
            $sample = new Sample(sprintf('Sample %s', $i));
            $manager->persist($sample);
        }

        $manager->flush();
    }

    public static function getGroups(): array
    {
        return ['sample'];
    }

    public function getOrder(): int
    {
        return 500;
    }
}
